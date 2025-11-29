import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { semesterService } from "./semester.service";

const createSemester = catchAsync(async (req, res) => {
  const result = await semesterService.createIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Semester created successfully",
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req, res) => {
  const result = await semesterService.getAllFromDB(req.query, req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Semesters retrieved successfully",
    data: result,
  });
});

const getSemesterById = catchAsync(async (req, res) => {
  const result = await semesterService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Semester retrieved successfully",
    data: result,
  });
});



export const semesterController = {
  createSemester,
  getAllSemesters,
  getSemesterById,
};
