import { Router } from "express";
import { AttendanceController } from "./attendance.controller";

const router = Router();

router.post("/", AttendanceController.createAttendance);
router.get("/", AttendanceController.getAllAttendance);
router.get("/:id", AttendanceController.getAttendanceById);
router.put("/:id", AttendanceController.updateAttendance);
router.delete("/:id", AttendanceController.deleteAttendance);
router.get("/:id/audits", AttendanceController.getAttendanceAudits);

export const attendanceRoute= router;
