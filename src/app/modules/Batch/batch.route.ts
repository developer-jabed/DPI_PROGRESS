import express from "express";
import { BatchController } from "./batch.controller";

const router = express.Router();

router.post("/", BatchController.createBatch);
router.get("/", BatchController.getAllBatches);
router.get("/:id", BatchController.getBatchById);
router.put("/:id", BatchController.updateBatch);
router.delete("/:id", BatchController.deleteBatch);

export const batchRoute = router;
