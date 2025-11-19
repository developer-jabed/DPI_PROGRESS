import { Request, Response, NextFunction } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import { ICreateUser, IQueryOptions } from "./user.interface";

export const UserController = {
  createUser: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload: ICreateUser = req.body;
    const user = await UserService.createUser(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: user,
    });
  }),

  getUsers: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Convert query params safely
    const page = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
    const limit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
    const sortBy = Array.isArray(req.query.sortBy) ? req.query.sortBy[0] : req.query.sortBy;
    const sortOrder = Array.isArray(req.query.sortOrder) ? req.query.sortOrder[0] : req.query.sortOrder;
    const searchTerm = Array.isArray(req.query.searchTerm) ? req.query.searchTerm[0] : req.query.searchTerm;

    const options: IQueryOptions = {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc",
      searchTerm: searchTerm as string,
    };

    const users = await UserService.getUsers(options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users fetched successfully",
      meta: users.meta,
      data: users.data,
    });
  }),
};
