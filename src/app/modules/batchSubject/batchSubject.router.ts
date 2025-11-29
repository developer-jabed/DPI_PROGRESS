import express from "express";
import { batchSubjectController } from "./batchSubject.controller";

const router = express.Router();

router.post("/create", batchSubjectController.createBatchSubject);
router.get("/", batchSubjectController.getAllBatchSubjects);
router.get("/:id", batchSubjectController.getBatchSubjectById);

export const batchSubjectRoutes = router;
