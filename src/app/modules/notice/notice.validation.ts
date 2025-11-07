// notice.validation.ts
import { z } from "zod";
import { Role, Shift, GroupName } from "@prisma/client";

export const createNoticeSchema = z.object({
  title: z.string().min(3, "Title is required"),
  body: z.string().min(3, "Body is required"),
  postedById: z.string(),
  departmentId: z.string().optional(),
  batchId: z.string().optional(),
  shift: z.nativeEnum(Shift).optional(),
  groupName: z.nativeEnum(GroupName).optional(),
  targetRole: z.nativeEnum(Role).optional(),
  isPublic: z.boolean().optional(),
});
