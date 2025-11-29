import { prisma } from "../../shared/prisma";
import { ISemesterFilterRequest } from "./semester.interface";
import { paginationHelper } from "../../helper/paginationHelper";
import { semesterSearchableFields } from "./semester.constant";
import { Prisma, SemesterName } from "@prisma/client";

const createIntoDB = async (payload: { name: SemesterName }) => {
  return await prisma.semester.create({
    data: { name: payload.name },
  });
};

const getAllFromDB = async (
  filters: ISemesterFilterRequest,
  paginationOptions: any
) => {
  const { searchTerm, ...filterData } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(
    paginationOptions
  );

  const andConditions: Prisma.SemesterWhereInput[] = [];

  // ✅ Search by enum (exact match)
  if (searchTerm) {
    andConditions.push({
      OR: semesterSearchableFields.map((field) => ({
        [field]: searchTerm as SemesterName,
      })),
    });
  }

  // ✅ Filter by valid fields only
  if (filterData.name) {
    andConditions.push({
      name: filterData.name,
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch data with pagination and relations
  const data = await prisma.semester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      batches: true,            // include related batches
      promotionsFrom: true,     // include promotions from this semester
      promotionsTo: true,       // include promotions to this semester
    },
  });

  const total = await prisma.semester.count({ where: whereConditions });

  return {
    meta: { total, page, limit },
    data,
  };
};

const getByIdFromDB = async (id: string) => {
  return await prisma.semester.findUniqueOrThrow({
    where: { id },
    include: {
      batches: true,
      promotionsFrom: true,
      promotionsTo: true,
    },
  });
};

const deleteFromDB = async (id: string) => {
  return await prisma.semester.delete({
    where: { id },
  });
};

export const semesterService = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
};
