import { prisma } from "../../shared/prisma";
import { addMinutes, startOfDay } from "date-fns";

export const ClassSessionService = {
  createDefaultClassSessions: async (dateStr: string) => {
    const startTime = new Date(dateStr);
    startTime.setHours(8, 0, 0, 0); // 8:00 AM
    const endTime = new Date(dateStr);
    endTime.setHours(18, 30, 0, 0); // 6:30 PM

    const sessionDuration = 45; // 45 minutes
    const sessions = [];
    let currentTime = startTime;

    while (currentTime < endTime) {
      sessions.push({ date: new Date(currentTime) });
      currentTime = addMinutes(currentTime, sessionDuration);
    }

    // Create in DB
    const createdSessions = await prisma.classSession.createMany({
      data: sessions.map((s) => ({ date: s.date })),
    });

    return createdSessions;
  },
};
