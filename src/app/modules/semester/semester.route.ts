import express from "express";
import { semesterController } from "./semester.controller";

const router = express.Router();

router.post(
  "/create",
  semesterController.createSemester
);

router.get("/", semesterController.getAllSemesters);

router.get("/:id", semesterController.getSemesterById);


export const semesterRoutes = router;
