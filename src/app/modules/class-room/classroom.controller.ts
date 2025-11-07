import { Request, Response } from "express";
import { ClassroomService } from "./classroom.service";

const createClassroom = async (req: Request, res: Response) => {
  const result = await ClassroomService.createClassroom(req.body);

  res.status(201).json({
    success: true,
    message: "Classroom created successfully!",
    data: result,
  });
};

const getAllClassrooms = async (req: Request, res: Response) => {
  const result = await ClassroomService.getAllClassrooms();

  res.status(200).json({
    success: true,
    message: "All classrooms fetched successfully!",
    data: result,
  });
};

const getSingleClassroom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassroomService.getSingleClassroom(id);

  res.status(200).json({
    success: true,
    message: "Classroom fetched successfully!",
    data: result,
  });
};

const deleteClassroom = async (req: Request, res: Response) => {
  const { id } = req.params;
  await ClassroomService.deleteClassroom(id);

  res.status(200).json({
    success: true,
    message: "Classroom deleted successfully!",
  });
};

export const ClassroomController = {
  createClassroom,
  getAllClassrooms,
  getSingleClassroom,
  deleteClassroom,
};
