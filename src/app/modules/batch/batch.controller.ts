import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { batchService } from "./batch.service";
import { Request, Response } from "express";


// Create batch
const createBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await batchService.createBatch(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Batch created successfully", data: result });
});

// Get all batches
const getAllBatches = catchAsync(async (req: Request, res: Response) => {
  const result = await batchService.getAllBatches(req.query, req.query);
  sendResponse(res, { statusCode: 200, success: true, message: "Batches fetched successfully", data: result });
});

// Get batch by ID
const getBatchById = catchAsync(async (req: Request, res: Response) => {
  const result = await batchService.getBatchById(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: "Batch fetched successfully", data: result });
});

// Delete batch

export const batchController = {
  createBatch,
  getAllBatches,
  getBatchById,

};
