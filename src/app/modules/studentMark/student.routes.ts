// src/app/modules/student/student.routes.ts
import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

// Extra Marks
router.post("/extra-mark", StudentController.createExtraMark);
router.get("/extra-mark/:studentId", StudentController.getExtraMarks);
router.delete("/extra-mark/:id", StudentController.deleteExtraMark);

// Penalties
router.post("/penalty", StudentController.createPenalty);
router.get("/penalty/:studentId", StudentController.getPenalties);
router.delete("/penalty/:id", StudentController.deletePenalty);

export const studentMark = router;
