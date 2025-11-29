import { Request, Response } from "express";

import { groupService } from "./group.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createGroup = catchAsync(async (req: Request, res: Response) => {
  const result = await groupService.createGroup(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Group created successfully",
    data: result,
  });
});

const getAllGroups = catchAsync(async (req: Request, res: Response) => {
  const result = await groupService.getAllGroups(req.query, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Groups fetched successfully",
    data: result,
  });
});

const getGroupById = catchAsync(async (req: Request, res: Response) => {
  const result = await groupService.getGroupById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Group fetched successfully",
    data: result,
  });
});


// ✅ Export as an object
export const groupController = {
  createGroup,
  getAllGroups,
  getGroupById,

};
