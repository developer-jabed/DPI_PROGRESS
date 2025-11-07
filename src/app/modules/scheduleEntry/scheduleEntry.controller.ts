import { Request, Response } from "express";
import { ScheduleEntryService } from "./scheduleEntry.service";

export const ScheduleEntryController = {
  create: async (req: Request, res: Response) => {
    try {
      const result = await ScheduleEntryService.createScheduleEntry(req.body);
      res.status(201).json({
        success: true,
        message: "Schedule entry created successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to create schedule entry",
      });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    const result = await ScheduleEntryService.getAllScheduleEntries();
    res.json({
      success: true,
      message: "All schedule entries retrieved successfully",
      data: result,
    });
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleEntryService.getScheduleEntryById(id);
    if (!result)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({
      success: true,
      message: "Schedule entry fetched successfully",
      data: result,
    });
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await ScheduleEntryService.updateScheduleEntry(id, req.body);
      res.json({
        success: true,
        message: "Schedule entry updated successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to update schedule entry",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await ScheduleEntryService.deleteScheduleEntry(id);
      res.json({
        success: true,
        message: "Schedule entry deleted successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to delete schedule entry",
      });
    }
  },
};
