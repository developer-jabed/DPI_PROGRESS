import { Request, Response } from "express";
import { BatchService } from "./batch.service";

const createBatch = async (req: Request, res: Response) => {
  try {
    const batch = await BatchService.createBatch(req.body);
    res.status(201).json({
      success: true,
      message: "Batch created successfully",
      data: batch,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBatches = async (req: Request, res: Response) => {
  const batches = await BatchService.getAllBatches();
  res.json({
    success: true,
    data: batches,
  });
};

const getBatchById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const batch = await BatchService.getBatchById(id);
  if (!batch) {
    return res.status(404).json({ success: false, message: "Batch not found" });
  }
  res.json({ success: true, data: batch });
};

const updateBatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedBatch = await BatchService.updateBatch(id, req.body);
    res.json({ success: true, data: updatedBatch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteBatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBatch = await BatchService.deleteBatch(id);
    res.json({ success: true, data: deletedBatch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const BatchController = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
};
