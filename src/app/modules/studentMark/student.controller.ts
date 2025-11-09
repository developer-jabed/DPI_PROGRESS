// src/app/modules/student/student.controller.ts
import { Request, Response } from "express";
import { ExtraMarkService } from "./extraMark.service";
import { PenaltyService } from "./penalty.service";

export const StudentController = {
  // ---------------- Extra Marks ----------------
  async createExtraMark(req: Request, res: Response) {
    try {
      const mark = await ExtraMarkService.createExtraMark(req.body);
      res.status(201).json({ success: true, data: mark });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getExtraMarks(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const marks = await ExtraMarkService.getExtraMarksByStudent(studentId);
      res.status(200).json({ success: true, data: marks });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteExtraMark(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ExtraMarkService.deleteExtraMark(id);
      res.status(200).json({ success: true, message: "Extra mark deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // ---------------- Penalties ----------------
  async createPenalty(req: Request, res: Response) {
    try {
      const penalty = await PenaltyService.createPenalty(req.body);
      res.status(201).json({ success: true, data: penalty });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getPenalties(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const penalties = await PenaltyService.getPenaltiesByStudent(studentId);
      res.status(200).json({ success: true, data: penalties });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deletePenalty(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await PenaltyService.deletePenalty(id);
      res.status(200).json({ success: true, message: "Penalty deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
