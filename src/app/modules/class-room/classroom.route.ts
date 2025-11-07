import express from "express";
import { ClassroomController } from "./classroom.controller";

const router = express.Router();

router.post("/create-classroom", ClassroomController.createClassroom);
router.get("/", ClassroomController.getAllClassrooms);
router.get("/:id", ClassroomController.getSingleClassroom);
router.delete("/:id", ClassroomController.deleteClassroom);

export const classroomRoute = router;
