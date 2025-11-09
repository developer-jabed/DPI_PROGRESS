import { Request, Response, NextFunction } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";


export class UserController {

  // =================== GET ALL USERS ===================
  static getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  });

  // =================== CREATE STUDENT ===================
  static createStudent = catchAsync(async (req: Request, res: Response) => {
    const student = await UserService.createStudent(req);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Student created successfully",
      data: student,
    });
  });

  // =================== CREATE TEACHER ===================
  static createTeacher = catchAsync(async (req: Request, res: Response) => {
    const teacher = await UserService.createTeacher(req);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  });

  // =================== CREATE CLASS REPRESENTATIVE ===================
  static createCr = catchAsync(async (req: Request, res: Response) => {
    const cr = await UserService.createCr(req);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Class Representative created successfully",
      data: cr,
    });
  });

  // =================== CREATE ADMIN ===================
  static createAdmin = catchAsync(async (req: Request, res: Response) => {
    const admin = await UserService.createAdmin(req);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  });

  // =================== CREATE FIRST ADMIN ===================
  static createFirstAdmin = catchAsync(async (req: Request, res: Response) => {
    const admin = await UserService.createAdmin(req);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "First admin created successfully",
      data: admin,
    });
  });
}
