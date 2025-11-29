import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { departmentService } from "./department.service";

const createDepartment = catchAsync(async (req, res) => {
  const result = await departmentService.createIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Department created successfully",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const result = await departmentService.getAllFromDB(req.query, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Departments retrieved successfully",
    data: result,
  });
});

const getDepartmentById = catchAsync(async (req, res) => {
  const result = await departmentService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department retrieved successfully",
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req, res) => {
  const result = await departmentService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department deleted successfully",
    data: result,
  });
});

export const departmentController = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartment,
};
