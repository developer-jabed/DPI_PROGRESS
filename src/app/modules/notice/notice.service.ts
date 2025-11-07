// notice.service.ts
import { prisma } from "../../shared/prisma";
import { Notice } from "@prisma/client";

export interface CreateNoticeInput {
  title: string;
  body: string;
  postedById: string;
  departmentId?: string;
  batchId?: string;
  shift?: "MORNING" | "DAY";
  groupName?: "A" | "B";
  targetRole?: "ADMIN" | "TEACHER" | "CR" | "STUDENT";
  isPublic?: boolean;
}

export const NoticeService = {
  async createNotice(data: CreateNoticeInput): Promise<Notice> {
    return prisma.notice.create({
      data, // ✅ pass the data here
      include: {
        postedBy: true,
        department: true,
        batch: true,
      },
    });
  },

  async getAllNotices(): Promise<Notice[]> {
    return prisma.notice.findMany({
      include: {
        postedBy: true,
        department: true,
        batch: true,
      },
    });
  },

  async getNoticeById(id: string): Promise<Notice | null> {
    return prisma.notice.findUnique({
      where: { id },
      include: {
        postedBy: true,
        department: true,
        batch: true,
      },
    });
  },

  async updateNotice(id: string, data: Partial<CreateNoticeInput>): Promise<Notice> {
    return prisma.notice.update({
      where: { id },
      data,
      include: {
        postedBy: true,
        department: true,
        batch: true,
      },
    });
  },

  async deleteNotice(id: string): Promise<Notice> {
    return prisma.notice.delete({
      where: { id },
    });
  },
};
