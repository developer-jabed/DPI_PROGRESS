import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BatchService } from "./batch.service";
import { IQueryOptions } from "../users/user.interface";
import { paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../shared/prisma";

export const BatchController = {
  createBatch: catchAsync(async (req: Request, res: Response) => {
    const result = await BatchService.createBatch(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Batch created successfully",
      data: result,
    });
  }),

  getAllBatches: async (options: IQueryOptions) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";
    const searchTerm = options.searchTerm;

    const skip = (page - 1) * limit;

    const where = searchTerm
      ? { name: { contains: searchTerm, mode: "insensitive" as const } }
      : {};

    const [total, data] = await Promise.all([
      prisma.batch.count({ where }),
      prisma.batch.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder as "asc" | "desc" },
        include: {
          cr: true,
          students: true,
          examSchedules: true,
          sessions: true,
          semester: true,
        },
      }),
    ]);

    const meta = paginationHelper.calculatePagination({ page, limit, total });

    return { meta, data };
  },

  getBatchById: catchAsync(async (req: Request, res: Response) => {
    const result = await BatchService.getBatchById(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Batch retrieved successfully",
      data: result,
    });
  }),

  updateBatch: catchAsync(async (req: Request, res: Response) => {
    const result = await BatchService.updateBatch(req.params.id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Batch updated successfully",
      data: result,
    });
  }),

  deleteBatch: catchAsync(async (req: Request, res: Response) => {
    const result = await BatchService.deleteBatch(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Batch deleted successfully",
      data: result,
    });
  }),
};
