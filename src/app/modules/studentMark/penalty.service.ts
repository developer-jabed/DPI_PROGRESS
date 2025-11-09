// src/app/modules/student/penalty.service.ts
import { prisma } from "../../shared/prisma";

interface CreatePenaltyInput {
  studentId: string;
  teacherId: string;
  points: number;
  reason?: string;
}

export const PenaltyService = {
  async createPenalty(data: CreatePenaltyInput) {
    return prisma.penalty.create({
      data,
      include: {
        student: true,
        givenBy: true,
      },
    });
  },

  async getPenaltiesByStudent(studentId: string) {
    return prisma.penalty.findMany({
      where: { studentId },
      include: {
        student: true,
        givenBy: true,
      },
    });
  },

  async deletePenalty(id: string) {
    return prisma.penalty.delete({
      where: { id },
    });
  },
};
