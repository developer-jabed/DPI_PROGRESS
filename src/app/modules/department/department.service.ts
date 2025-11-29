import { prisma } from "../../shared/prisma";
import { DepartmentName } from "@prisma/client";
import { paginationHelper } from "../../helper/paginationHelper";

interface IDepartmentFilterRequest {
  searchTerm?: string;
  name?: DepartmentName;
}

const departmentSearchableFields = ["name"];

const createIntoDB = async (payload: { name: DepartmentName }) => {
  return await prisma.department.create({
    data: { name: payload.name },
  });
};

const getAllFromDB = async (filters: IDepartmentFilterRequest, paginationOptions: any) => {
  const { searchTerm, ...filterData } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(paginationOptions);

  const andConditions: any[] = [];

  // ✅ Search by enum (exact match)
  if (searchTerm) {
    andConditions.push({
      OR: departmentSearchableFields.map(field => ({
        [field]: searchTerm as DepartmentName,
      })),
    });
  }

  // ✅ Filter by valid fields only
  if (filterData.name) {
    andConditions.push({
      name: filterData.name,
    });
  }

  const whereConditions = andConditions.length ? { AND: andConditions } : {};

 const data = await prisma.department.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      batches: true,   // ✅ include related batches
      subjects: true,  // ✅ include related subjects
    },
  });

  const total = await prisma.department.count({ where: whereConditions });

  return {
    meta: { total, page, limit },
    data,
  };
};

const getByIdFromDB = async (id: string) => {
  return await prisma.department.findUniqueOrThrow({
    where: { id },
    include: { batches: true, subjects: true },
  });
};

const deleteFromDB = async (id: string) => {
  return await prisma.department.delete({ where: { id } });
};

export const departmentService = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
};
