import { prisma } from "../../shared/prisma";
import { IBatchSubjectFilterRequest } from "./batchSubject.interface";
import { paginationHelper } from "../../helper/paginationHelper";
import { Prisma } from "@prisma/client";

 const createBatchSubject = async (payload: { batchId: string; subjectId: string }) => {
  return prisma.batchSubject.create({ data: payload });
};

 const getAllBatchSubjects = async (filters: IBatchSubjectFilterRequest, paginationOptions: any) => {
  const { batchId, subjectId } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(paginationOptions);

  const andConditions: Prisma.BatchSubjectWhereInput[] = [];

  if (batchId) andConditions.push({ batchId });
  if (subjectId) andConditions.push({ subjectId });

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const data = await prisma.batchSubject.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      batch: true,
      subject: true,
    },
  });

  const total = await prisma.batchSubject.count({ where: whereConditions });

  return { meta: { total, page, limit }, data };
};

 const getBatchSubjectById = async (id: string) => {
  return prisma.batchSubject.findUniqueOrThrow({
    where: { id },
    include: { batch: true, subject: true },
  });
};

export const batchSubjectService ={
    createBatchSubject,
    getAllBatchSubjects,
    getBatchSubjectById
}
