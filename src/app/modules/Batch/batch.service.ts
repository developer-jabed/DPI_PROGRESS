import { prisma } from "../../shared/prisma";
import { Batch } from "@prisma/client";

interface CreateBatchInput {
  year: number;
  semester: number;
  shift: "MORNING" |  "DAY";
  groupName: "A" | "B" ;
  departmentId?: string;
}

interface UpdateBatchInput extends Partial<CreateBatchInput> {}

export const BatchService = {
  // Create a batch
  createBatch: async (data: CreateBatchInput): Promise<Batch> => {
    return prisma.batch.create({
      data,
    });
  },

  // Get all batches
  getAllBatches: async (): Promise<Batch[]> => {
    return prisma.batch.findMany({
      include: {
        students: true,
        schedules: true,
        cr: true,
        notices: true,
      },
    });
  },

  // Get a batch by ID
  getBatchById: async (id: string): Promise<Batch | null> => {
    return prisma.batch.findUnique({
      where: { id },
      include: {
        students: true,
        schedules: true,
        cr: true,
        notices: true,
      },
    });
  },

  // Update batch
  updateBatch: async (id: string, data: UpdateBatchInput): Promise<Batch> => {
    return prisma.batch.update({
      where: { id },
      data,
    });
  },

  // Delete batch
  deleteBatch: async (id: string): Promise<Batch> => {
    return prisma.batch.delete({
      where: { id },
    });
  },
};
