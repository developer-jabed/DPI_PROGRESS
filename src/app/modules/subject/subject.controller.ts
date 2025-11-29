import { Request, Response } from "express";
import { subjectService } from "./subject.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await subjectService.createSubject(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Subject created successfully",
    data: result,
  });
});

const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  const result = await subjectService.getAllSubjects(req.query, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subjects fetched successfully",
    data: result,
  });
});

const getSubjectById = catchAsync(async (req: Request, res: Response) => {
  const result = await subjectService.getSubjectById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subject fetched successfully",
    data: result,
  });
});


export const subjectController = {
  createSubject,
  getAllSubjects,
  getSubjectById,
};
