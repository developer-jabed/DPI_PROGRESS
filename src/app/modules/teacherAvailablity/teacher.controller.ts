// src/app/modules/teacher/teacher.controller.ts
import { Request, Response } from "express";
import { TeacherAvailabilityService } from "./teacherAvailability.service";
import { TeacherLeaveService } from "./teacherLeave.service";

export const TeacherController = {
  // ---------------- AVAILABILITY ----------------
  async createAvailability(req: Request, res: Response) {
    try {
      const availability = await TeacherAvailabilityService.createAvailability(req.body);
      res.status(201).json({ success: true, data: availability });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAvailability(req: Request, res: Response) {
    try {
      const { teacherId } = req.params;
      const availabilities = await TeacherAvailabilityService.getTeacherAvailability(teacherId);
      res.status(200).json({ success: true, data: availabilities });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteAvailability(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TeacherAvailabilityService.deleteAvailability(id);
      res.status(200).json({ success: true, message: "Availability deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // ---------------- LEAVES ----------------
  async createLeave(req: Request, res: Response) {
    try {
      const leave = await TeacherLeaveService.createLeave(req.body);
      res.status(201).json({ success: true, data: leave });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getLeaves(req: Request, res: Response) {
    try {
      const { teacherId } = req.params;
      const leaves = await TeacherLeaveService.getTeacherLeaves(teacherId);
      res.status(200).json({ success: true, data: leaves });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteLeave(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TeacherLeaveService.deleteLeave(id);
      res.status(200).json({ success: true, message: "Leave deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
