import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { SubjectService } from "./subject.service";

const createSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectService.createSubject(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Subject created successfully!",
    data: result,
  });
});

const updateSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectService.updateSubject(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subject updated successfully!",
    data: result,
  });
});

const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectService.getAllSubjects();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subjects retrieved successfully!",
    data: result,
  });
});

const getSubjectById = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectService.getSubjectById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subject retrieved successfully!",
    data: result,
  });
});

const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectService.deleteSubject(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subject deleted successfully!",
    data: result,
  });
});

export const SubjectController = {
  createSubject,
  updateSubject,
  getAllSubjects,
  getSubjectById,
  deleteSubject,
};
