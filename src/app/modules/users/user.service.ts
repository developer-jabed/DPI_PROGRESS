import { Request } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";
import { Admin, Teacher, Student, Cr, Role, Prisma } from "@prisma/client";
import { fileUploader } from "../../helper/fileUploader";

// =================== CREATE STUDENT ===================
const createStudent = async (req: Request): Promise<Student> => {
  const data = req.body.data;

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    data.profileUrl = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const student = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        displayName: data.displayName,
        email: data.email,
        password: hashedPassword,
        role: Role.STUDENT,
        profileUrl: data.profileUrl,
      },
    });

    const createdStudent = await tx.student.create({
      data: {
        userId: user.id,
        rollNumber: data.rollNumber,
        registrationNumber: data.registrationNumber,
        phoneNumber: data.phoneNumber,
        parentsPhone: data.parentsPhone,
        batchId: data.batchId,
      },
    });

    return createdStudent;
  });

  return student;
};

// =================== CREATE TEACHER ===================
const createTeacher = async (req: Request): Promise<Teacher> => {
  const data = req.body.data;

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    data.profileUrl = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const teacher = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        displayName: data.displayName,
        email: data.email,
        password: hashedPassword,
        role: Role.TEACHER,
        profileUrl: data.profileUrl,
      },
    });

    const createdTeacher = await tx.teacher.create({
      data: {
        userId: user.id,
        bio: data.bio,
        phoneNumber: data.phoneNumber,
        departmentId: data.departmentId,
      },
    });

    // Connect subjects if provided
    if (data.subjects?.length) {
      await tx.teacher.update({
        where: { id: createdTeacher.id },
        data: {
          subjects: {
            connect: data.subjects.map((id: string) => ({ id })),
          },
        },
      });
    }

    return createdTeacher;
  });

  return teacher;
};

// =================== CREATE CR ===================
const createCr = async (req: Request): Promise<Cr> => {
  const data = req.body.data;

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    data.profileUrl = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const cr = await prisma.$transaction(async (tx) => {
    // 1️⃣ Create User
    const user = await tx.user.create({
      data: {
        displayName: data.displayName,
        email: data.email,
        password: hashedPassword,
        role: Role.CR,
        profileUrl: data.profileUrl,
      },
    });

    // 2️⃣ Create Student
    const student = await tx.student.create({
      data: {
        userId: user.id,
        rollNumber: data.rollNumber,
        registrationNumber: data.registrationNumber,
        phoneNumber: data.phoneNumber,
        parentsPhone: data.parentsPhone,
        batchId: data.batchId,
      },
    });

    // 3️⃣ Create CR
    const createdCr = await tx.cr.create({
      data: {
        userId: user.id,
        studentId: student.id as string, // UncheckedCreate if TS complains
        batchId: data.batchId,
      },
      include: {
        user: true,
        student: true,
        batch: true,
      },
    });

    return createdCr;
  });

  return cr;
};

// =================== CREATE ADMIN ===================
const createAdmin = async (req: Request): Promise<Admin> => {
  const data = req.body.data;

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    data.profileUrl = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        displayName: data.displayName,
        email: data.email,
        password: hashedPassword,
        role: Role.ADMIN,
        profileUrl: data.profileUrl,
      },
    });

    const createdAdmin = await tx.admin.create({
      data: {
        userId: user.id,
        profileUrl: data.profileUrl,
        phoneNumber: data.phoneNumber,
        designation: data.designation,
      },
    });

    return createdAdmin;
  });

  return admin;
};

// =================== GET ALL USERS WITH SEARCH, SORT, PAGINATION ===================
interface GetAllUsersOptions {
  search?: string;
  role?: Role;
  sortBy?: "displayName" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

const getAllUsers = async (options: GetAllUsersOptions = {}) => {
  const {
    search,
    role,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = options;

  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = {};

  if (search) {
    where.OR = [
      { displayName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (role) {
    where.role = role;
  }

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      include: {
        student: true,
        teacher: true,
        cr: true,
        admin: true,
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

// =================== EXPORT ===================
export const UserService = {
  createStudent,
  createTeacher,
  createCr,
  createAdmin,
  getAllUsers,
};
