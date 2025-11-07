import { Request, Response } from "express";
import { DepartmentService } from "./department.service";
import { DepartmentValidation } from "./department.validation";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const parsed = DepartmentValidation.createDepartment.parse(req.body);
  const result = await DepartmentService.createDepartment(parsed);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Department created successfully!",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (_req: Request, res: Response) => {
  const result = await DepartmentService.getAllDepartments();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Departments retrieved successfully!",
    data: result,
  });
});

const getDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DepartmentService.getDepartmentById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department retrieved successfully!",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = DepartmentValidation.updateDepartment.parse(req.body);
  const result = await DepartmentService.updateDepartment(id, parsed);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department updated successfully!",
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DepartmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department deleted successfully!",
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
