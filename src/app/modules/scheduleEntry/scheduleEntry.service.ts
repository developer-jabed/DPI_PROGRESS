import { prisma } from "../../shared/prisma";
import { ScheduleEntry } from "@prisma/client";

interface CreateScheduleEntryInput {
  departmentId: string;
  subjectId: string;
  teacherId?: string;
  dayOfWeek: number;
  slotIndex: number;
  shift: "MORNING" | "DAY";
  groupName: "A" | "B";
  classroomId?: string;
  isPractical?: boolean;
  batchIds?: string[]; // ✅ optional batchIds to connect
}

export const ScheduleEntryService = {
  // ✅ Create a new schedule entry and link batches
  createScheduleEntry: async (data: CreateScheduleEntryInput): Promise<ScheduleEntry> => {
    const { batchIds, ...rest } = data;

    // Step 1: Create schedule entry
    const schedule = await prisma.scheduleEntry.create({
      data: rest,
    });

    // Step 2: Link batches via BatchOnScheduleEntry
    if (batchIds && batchIds.length > 0) {
      await prisma.batchOnScheduleEntry.createMany({
        data: batchIds.map((batchId) => ({
          batchId,
          scheduleEntryId: schedule.id,
        })),
      });
    }

    // Step 3: Return with full relational data
    return prisma.scheduleEntry.findUniqueOrThrow({
      where: { id: schedule.id },
      include: {
        department: true,
        subject: true,
        teacher: true,
        classroom: true,
        batches: {
          include: {
            batch: true,
          },
        },
      },
    });
  },

  // ✅ Get all schedule entries
  getAllScheduleEntries: async (): Promise<ScheduleEntry[]> => {
    return prisma.scheduleEntry.findMany({
      include: {
        department: true,
        subject: true,
        teacher: true,
        classroom: true,
        batches: {
          include: {
            batch: true,
          },
        },
      },
    });
  },

  // ✅ Get single schedule entry by ID
  getScheduleEntryById: async (id: string): Promise<ScheduleEntry | null> => {
    return prisma.scheduleEntry.findUnique({
      where: { id },
      include: {
        department: true,
        subject: true,
        teacher: true,
        classroom: true,
        batches: {
          include: {
            batch: true,
          },
        },
      },
    });
  },

  // ✅ Update schedule entry and reassign batches
  updateScheduleEntry: async (
    id: string,
    data: Partial<CreateScheduleEntryInput>
  ): Promise<ScheduleEntry> => {
    const { batchIds, ...rest } = data;

    // Step 1: Update base schedule info
    const schedule = await prisma.scheduleEntry.update({
      where: { id },
      data: rest,
    });

    // Step 2: If batches are provided, reset and reassign
    if (batchIds) {
      await prisma.batchOnScheduleEntry.deleteMany({
        where: { scheduleEntryId: id },
      });

      await prisma.batchOnScheduleEntry.createMany({
        data: batchIds.map((batchId) => ({
          batchId,
          scheduleEntryId: id,
        })),
      });
    }

    // Step 3: Return updated schedule with relations
    return prisma.scheduleEntry.findUniqueOrThrow({
      where: { id },
      include: {
        department: true,
        subject: true,
        teacher: true,
        classroom: true,
        batches: {
          include: {
            batch: true,
          },
        },
      },
    });
  },

  // ✅ Delete schedule entry
  deleteScheduleEntry: async (id: string): Promise<ScheduleEntry> => {
    // Delete related join records first
    await prisma.batchOnScheduleEntry.deleteMany({
      where: { scheduleEntryId: id },
    });

    return prisma.scheduleEntry.delete({
      where: { id },
    });
  },
};
