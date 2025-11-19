import bcrypt from "bcrypt";
import { Department, Prisma, PrismaClient } from "@prisma/client"; // ✅ Import Department enum
import { ICreateUser, IQueryOptions } from "./user.interface";
import { paginationHelper } from "../../helper/paginationHelper";

const prisma = new PrismaClient();

export const UserService = {
  createUser: async (payload: ICreateUser) => {

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        displayName: payload.displayName,
        role: payload.role,
        profileUrl: payload.profileUrl,
        status: payload.status,
      },
    });

    switch (payload.role) {
      case "STUDENT":
        if (!payload.batchId || !payload.phoneNumber || !payload.parentsPhone) {
          throw new Error("Missing required fields for STUDENT");
        }
        await prisma.student.create({
          data: {
            userId: user.id,
            batchId: payload.batchId,
            rollNumber: `R-${Date.now()}`,
            registration: `REG-${Date.now()}`,
            phoneNumber: payload.phoneNumber,
            parentsPhone: payload.parentsPhone,
          },
        });
        break;

      case "TEACHER":
        if (!payload.department) throw new Error("Missing department for TEACHER");
        await prisma.teacher.create({
          data: {
            userId: user.id,
            department: payload.department as Department,
            phoneNumber: payload.phoneNumber,
            bio: payload.bio,
            profileUrl: payload.profileUrl,
          },
        });
        break;

      case "ADMIN":
        await prisma.admin.create({
          data: {
            userId: user.id,
            phoneNumber: payload.phoneNumber,
            designation: payload.designation,
            profileUrl: payload.profileUrl,
          },
        });
        break;

      case "CR":
        if (!payload.batchId || !payload.studentId) {
          throw new Error("Missing batchId or studentId for CR");
        }
        await prisma.cR.create({
          data: {
            userId: user.id,
            batchId: payload.batchId,
            studentId: payload.studentId,
          },
        });
        break;

      default:
        throw new Error("Invalid user role");
    }

    return user;
  },

  getUsers: async (options: IQueryOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

    const searchFilter: Prisma.UserWhereInput | undefined = options.searchTerm
      ? {
        OR: [
          { email: { contains: options.searchTerm, mode: "insensitive" as Prisma.QueryMode } },
          { displayName: { contains: options.searchTerm, mode: "insensitive" as Prisma.QueryMode } },
        ],
      }
      : undefined;

    const [total, users] = await prisma.$transaction([
      prisma.user.count({ where: searchFilter }),
      prisma.user.findMany({
        where: searchFilter,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          student: true,
          teacher: true,
          admin: true,
          cr: true,
        },
      }),
    ]);

    return {
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data: users,
    };
  },
};
