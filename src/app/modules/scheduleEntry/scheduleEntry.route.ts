import express from "express";
import { ScheduleEntryController } from "./scheduleEntry.controller";

const router = express.Router();

router.post("/", ScheduleEntryController.create);
router.get("/", ScheduleEntryController.getAll);
router.get("/:id", ScheduleEntryController.getById);
router.put("/:id", ScheduleEntryController.update);
router.delete("/:id", ScheduleEntryController.delete);

export const ScheduleEntryRoutes = router;
