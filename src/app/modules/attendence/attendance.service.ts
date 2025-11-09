import { prisma } from "../../shared/prisma";
import { AttendanceRecord, AttendanceAudit } from "@prisma/client";

interface CreateAttendanceInput {
  sessionId: string;
  studentId: string;
  present: boolean;
  markedById: string;
  reason?: string;
}

interface UpdateAttendanceInput {
  present?: boolean;
  status?: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "CORRECTED";
  reason?: string;
  changedById?: string;
  changeReason?: string;
}

export const AttendanceService = {
  // Create attendance
  async createAttendance(data: CreateAttendanceInput): Promise<AttendanceRecord> {
    return prisma.attendanceRecord.create({
      data: {
        ...data,
      },
      include: {
        student: true,
        session: true,
        markedBy: true,
        audits: true,
      },
    });
  },

  // Get all attendance records
  async getAllAttendance(): Promise<AttendanceRecord[]> {
    return prisma.attendanceRecord.findMany({
      include: {
        student: true,
        session: true,
        markedBy: true,
        audits: true,
      },
    });
  },

  // Get attendance by ID
  async getAttendanceById(id: string): Promise<AttendanceRecord | null> {
    return prisma.attendanceRecord.findUnique({
      where: { id },
      include: {
        student: true,
        session: true,
        markedBy: true,
        audits: true,
      },
    });
  },

  // Update attendance and optionally create an audit
  async updateAttendance(id: string, data: UpdateAttendanceInput): Promise<AttendanceRecord> {
    const attendance = await prisma.attendanceRecord.findUnique({ where: { id } });
    if (!attendance) throw new Error("Attendance record not found");

    // Create audit if present or status changes
    if (data.changedById && (data.present !== undefined || data.status)) {
      await prisma.attendanceAudit.create({
        data: {
          attendanceId: id,
          changedById: data.changedById,
          changeType: data.present !== undefined ? "PRESENT_UPDATE" : "STATUS_UPDATE",
          previousValue: JSON.stringify({
            present: attendance.present,
            status: attendance.status,
          }),
          newValue: JSON.stringify({
            present: data.present ?? attendance.present,
            status: data.status ?? attendance.status,
          }),
          reason: data.changeReason,
        },
      });
    }

    return prisma.attendanceRecord.update({
      where: { id },
      data: {
        present: data.present,
        status: data.status,
        reason: data.reason,
      },
      include: {
        student: true,
        session: true,
        markedBy: true,
        audits: true,
      },
    });
  },

  // Delete attendance
  async deleteAttendance(id: string): Promise<AttendanceRecord> {
    return prisma.attendanceRecord.delete({ where: { id } });
  },

  // Get all audits for a specific attendance
  async getAttendanceAudits(attendanceId: string): Promise<AttendanceAudit[]> {
    return prisma.attendanceAudit.findMany({
      where: { attendanceId },
      include: {
        changedBy: true,
        attendance: true,
      },
    });
  },
};
