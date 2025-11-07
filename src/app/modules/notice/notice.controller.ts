// notice.controller.ts
import { Request, Response } from "express";
import { NoticeService } from "./notice.service";
import { createNoticeSchema } from "./notice.validation";

export const NoticeController = {
  // Create notice
  async createNotice(req: Request, res: Response) {
    try {
      const parsed = createNoticeSchema.parse(req.body); // ✅ validate
      console.log("Body:", parsed)
      const notice = await NoticeService.createNotice(parsed);

      res.status(201).json({
        success: true,
        message: "Notice created successfully",
        data: notice,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error?.errors || error.message,
      });
    }
  },

  async getAllNotices(req: Request, res: Response) {
    try {
      const notices = await NoticeService.getAllNotices();
      res.status(200).json({
        success: true,
        data: notices,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getNoticeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notice = await NoticeService.getNoticeById(id);

      if (!notice)
        return res.status(404).json({ success: false, message: "Notice not found" });

      res.status(200).json({ success: true, data: notice });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async updateNotice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await NoticeService.updateNotice(id, data);

      res.status(200).json({
        success: true,
        message: "Notice updated successfully",
        data: updated,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteNotice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await NoticeService.deleteNotice(id);

      res.status(200).json({
        success: true,
        message: "Notice deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
