import { Request, Response } from "express";
import { ClassSessionService } from "./classSession.service";

const generateClassSessions = async (req: Request, res: Response) => {
  const { date } = req.body; // only date is needed

  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Date is required",
    });
  }

  try {
    const sessions = await ClassSessionService.createDefaultClassSessions(date);

    res.status(201).json({
      success: true,
      message: "Class sessions created successfully!",
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create class sessions",
      error,
    });
  }
};

export const ClassSessionController = {
  generateClassSessions,
};
