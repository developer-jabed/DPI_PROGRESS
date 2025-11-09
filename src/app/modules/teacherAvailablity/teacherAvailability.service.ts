// src/app/modules/teacher/teacherAvailability.service.ts
import { prisma } from "../../shared/prisma";

interface CreateAvailabilityInput {
  teacherId: string;
  dayOfWeek: number;
  slotIndex: number;
}

export const TeacherAvailabilityService = {
  async createAvailability(data: CreateAvailabilityInput) {
    return prisma.teacherAvailability.create({
      data,
    });
  },

  async getTeacherAvailability(teacherId: string) {
    return prisma.teacherAvailability.findMany({
      where: { teacherId },
    });
  },

  async deleteAvailability(id: string) {
    return prisma.teacherAvailability.delete({
      where: { id },
    });
  },
};
