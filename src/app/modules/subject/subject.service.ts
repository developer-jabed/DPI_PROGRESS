import { prisma } from "../../shared/prisma";
import { ISubjectFilterRequest } from "./subject.interface";
import { paginationHelper } from "../../helper/paginationHelper";
import { subjectSearchableFields } from "./subject.constant";
import { Prisma } from "@prisma/client";

 const createSubject = async (payload: { name: string; code?: string; departmentId?: string }) => {
  return prisma.subject.create({ data: payload });
};

 const getAllSubjects = async (filters: ISubjectFilterRequest, paginationOptions: any) => {
  const { searchTerm, ...filterData } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(paginationOptions);

  const andConditions: Prisma.SubjectWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: subjectSearchableFields.map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (filterData.name) andConditions.push({ name: filterData.name });
  if (filterData.code) andConditions.push({ code: filterData.code });
  if (filterData.departmentId) andConditions.push({ departmentId: filterData.departmentId });

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const data = await prisma.subject.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      department: true,
      batchSubjects: true,
      teacherSubjects: true,
      attendances: true,
      routines: true,
    },
  });

  const total = await prisma.subject.count({ where: whereConditions });

  return { meta: { total, page, limit }, data };
};

 const getSubjectById = async (id: string) => {
  return prisma.subject.findUniqueOrThrow({
    where: { id },
    include: {
      department: true,
      batchSubjects: true,
      teacherSubjects: true,
      attendances: true,
      routines: true,
    },
  });
};

export const subjectService = {
  createSubject,
  getAllSubjects,
  getSubjectById
}
