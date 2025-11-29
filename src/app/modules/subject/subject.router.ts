import express from "express";
import { subjectController } from "./subject.controller";

const router = express.Router();

router.post("/create", subjectController.createSubject);
router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSubjectById);

export const subjectRoutes = router;
