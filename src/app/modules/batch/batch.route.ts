import express from "express";
import { batchController } from "./batch.controller";

const router = express.Router();

router.post("/create", batchController.createBatch);
router.get("/", batchController.getAllBatches);
router.get("/:id", batchController.getBatchById);

export const batchRoutes = router;
