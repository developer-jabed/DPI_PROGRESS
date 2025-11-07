import express from "express";
import { SubjectController } from "./subject.controller";

const router = express.Router();

router.post("/create-subject", SubjectController.createSubject);
router.get("/", SubjectController.getAllSubjects);
router.get("/:id", SubjectController.getSubjectById);
router.patch("/:id", SubjectController.updateSubject);
router.delete("/:id", SubjectController.deleteSubject);

export const SubjectRoute = router;
