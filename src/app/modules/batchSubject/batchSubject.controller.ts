import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { batchSubjectService } from "./batchSubject.service";
import sendResponse from "../../shared/sendResponse";


const createBatchSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await batchSubjectService.createBatchSubject(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "BatchSubject created successfully",
    data: result,
  });
});

const getAllBatchSubjects = catchAsync(async (req: Request, res: Response) => {
  const result = await batchSubjectService.getAllBatchSubjects(req.query, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "BatchSubjects fetched successfully",
    data: result,
  });
});

const getBatchSubjectById = catchAsync(async (req: Request, res: Response) => {
  const result = await batchSubjectService.getBatchSubjectById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "BatchSubject fetched successfully",
    data: result,
  });
});



export const batchSubjectController = {
  createBatchSubject,
  getAllBatchSubjects,
  getBatchSubjectById,

};
