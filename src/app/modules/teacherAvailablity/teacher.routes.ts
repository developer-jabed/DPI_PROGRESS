// src/app/modules/teacher/teacher.routes.ts
import { Router } from "express";
import { TeacherController } from "./teacher.controller";

const router = Router();

// Availability
router.post("/availability", TeacherController.createAvailability);
router.get("/availability/:teacherId", TeacherController.getAvailability);
router.delete("/availability/:id", TeacherController.deleteAvailability);

// Leave
router.post("/leave", TeacherController.createLeave);
router.get("/leave/:teacherId", TeacherController.getLeaves);
router.delete("/leave/:id", TeacherController.deleteLeave);

export const teacherAvailabilityRoute = router;
