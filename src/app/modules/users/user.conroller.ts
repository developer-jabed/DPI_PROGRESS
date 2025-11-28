import { Request, Response } from "express";
import httpStatus from "http-status";
import { userFilterableFields } from "./user.constant";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { userService } from "./user.service";
import { IAuthUser } from "./user.interface";

// ---------------- CREATE ADMIN ----------------
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createAdmin(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin created successfully!",
        data: result,
    });
});

// ---------------- CREATE TEACHER ----------------
const createTeacher = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createTeacher(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Teacher created successfully!",
        data: result,
    });
});

// ---------------- CREATE STUDENT ----------------
const createStudent = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createStudent(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully!",
        data: result,
    });
});

// ---------------- CREATE CR ----------------
const createCr = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createCr(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "CR created successfully!",
        data: result,
    });
});

// ---------------- GET ALL USERS ----------------
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await userService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data,
    });
});

// ---------------- CHANGE PROFILE STATUS ----------------
const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile status changed!",
        data: result,
    });
});

// ---------------- GET MY PROFILE ----------------
const getMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await userService.getMyProfile(user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fetched!",
        data: result,
    });
});

// ---------------- UPDATE MY PROFILE ----------------
const updateMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await userService.updateMyProfile(user as IAuthUser, req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile updated!",
        data: result,
    });
});

export const userController = {
    createAdmin,
    createTeacher,
    createStudent,
    createCr,
    getAllFromDB,
    changeProfileStatus,
    getMyProfile,
    updateMyProfile,
};
