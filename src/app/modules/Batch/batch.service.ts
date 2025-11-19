import { PrismaClient, Prisma } from "@prisma/client";
import { ICreateBatch, IUpdateBatch } from "./batch.interface";
import { IQueryOptions } from "../users/user.interface";
import { paginationHelper } from "../../helper/paginationHelper";

const prisma = new PrismaClient();

export const BatchService = {
  createBatch: async (payload: ICreateBatch) => {
    return prisma.batch.create({ data: payload });
  },

  getAllBatches: async (options: IQueryOptions) => {
    const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", searchTerm } = options;

    const skip = (Number(page) - 1) * Number(limit);

    // Proper Prisma type for where
    const where: Prisma.BatchWhereInput = searchTerm
      ? { name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } }
      : {};

    const [total, data] = await Promise.all([
      prisma.batch.count({ where }),
      prisma.batch.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { [sortBy]: sortOrder },
        include: {
          cr: true,
          students: true,
          examSchedules: true,
          sessions: true,
          semester: true,
        },
      }),
    ]);

    return {
      meta: paginationHelper.calculatePagination({ page: Number(page), limit: Number(limit), total }),
      data,
    };
  },

  getBatchById: async (id: string) => {
    return prisma.batch.findUnique({
      where: { id },
      include: {
        cr: true,
        students: true,
        examSchedules: true,
        sessions: true,
        semester: true,
      },
    });
  },

  updateBatch: async (id: string, payload: IUpdateBatch) => {
    return prisma.batch.update({
      where: { id },
      data: payload,
    });
  },

  deleteBatch: async (id: string) => {
    return prisma.batch.delete({
      where: { id },
    });
  },
};
