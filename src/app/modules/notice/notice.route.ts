import express from "express";
import { NoticeController } from "./notice.controller";

const router = express.Router();

// POST /api/notices
router.post("/", NoticeController.createNotice);

// GET /api/notices
router.get("/", NoticeController.getAllNotices);

// GET /api/notices/:id
router.get("/:id", NoticeController.getNoticeById);

// PATCH /api/notices/:id
router.patch("/:id", NoticeController.updateNotice);

// DELETE /api/notices/:id
router.delete("/:id", NoticeController.deleteNotice);

export const NoticeRoutes = router;
