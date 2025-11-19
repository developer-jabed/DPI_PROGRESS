// src/modules/batch/batch.route.ts
import express from "express";
import { BatchController } from "./batch.controller";

const router = express.Router();

router.post("/", BatchController.createBatch);
router.get("/", BatchController.getAllBatches);
router.get("/:id", BatchController.getBatchById);
router.put("/:id", BatchController.updateBatch);


export const batchRoute = router;
