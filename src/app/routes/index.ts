import express from 'express';
import { userRoutes } from '../modules/users/user.route';
import { departmentRoute } from '../modules/department/department.route';
import { SubjectRoute } from '../modules/subject/subject.route';
import { classroomRoute } from '../modules/class-room/classroom.route';
import { classSessionRoute } from '../modules/classSession/classSession.route';
import { batchRoute } from '../modules/Batch/batch.route';
import { ScheduleEntryRoutes } from '../modules/scheduleEntry/scheduleEntry.route';
import { NoticeRoutes } from '../modules/notice/notice.route';
import { teacherAvailabilityRoute } from '../modules/teacherAvailablity/teacher.routes';
import { studentMark } from '../modules/studentMark/student.routes';
import { attendanceRoute } from '../modules/attendence/attendance.routes';



const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/department',
        route: departmentRoute
    },
    {
        path: '/subject',
        route: SubjectRoute
    },
    {
        path: '/classroom',
        route: classroomRoute
    },
    {
        path: '/class-session',
        route: classSessionRoute
    },
    {
        path: '/batch',
        route: batchRoute
    },
    {
        path: '/scheduleEntry',
        route: ScheduleEntryRoutes
    },
    {
        path: '/notice',
        route: NoticeRoutes
    },
    {
        path: '/teacherAvailablity',
        route: teacherAvailabilityRoute
    },
    {
        path: '/mark',
        route: studentMark
    },
    {
        path: '/attendence',
        route: attendanceRoute
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;