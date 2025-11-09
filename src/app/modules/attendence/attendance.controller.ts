import { Request, Response } from "express";
import { AttendanceService } from "./attendance.service";

export const AttendanceController = {
  async createAttendance(req: Request, res: Response) {
    try {
      const attendance = await AttendanceService.createAttendance(req.body);
      res.status(201).json({
        success: true,
        message: "Attendance created successfully",
        data: attendance,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAllAttendance(req: Request, res: Response) {
    try {
      const records = await AttendanceService.getAllAttendance();
      res.status(200).json({ success: true, data: records });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAttendanceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await AttendanceService.getAttendanceById(id);
      if (!record) return res.status(404).json({ success: false, message: "Attendance not found" });

      res.status(200).json({ success: true, data: record });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async updateAttendance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await AttendanceService.updateAttendance(id, data);
      res.status(200).json({ success: true, message: "Attendance updated", data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteAttendance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AttendanceService.deleteAttendance(id);
      res.status(200).json({ success: true, message: "Attendance deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAttendanceAudits(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const audits = await AttendanceService.getAttendanceAudits(id);
      res.status(200).json({ success: true, data: audits });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
