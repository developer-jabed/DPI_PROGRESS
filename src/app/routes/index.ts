import express from 'express';
import { userRoutes } from '../modules/users/user.router';
import { departmentRoutes } from '../modules/department/department.route';
import { semesterRoutes } from '../modules/semester/semester.route';
import { groupRoutes } from '../modules/group/group.router';
import { subjectRoutes } from '../modules/subject/subject.router';
import { batchSubjectRoutes } from '../modules/batchSubject/batchSubject.router';
import { batchRoutes } from '../modules/batch/batch.route';



const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes
  },
  {
    path: '/department',
    route: departmentRoutes
  },
  {
    path: '/semester',
    route: semesterRoutes
  },
  {
    path: '/group',
    route: groupRoutes
  },
  {
    path: '/subject',
    route: subjectRoutes
  },
  {
    path: '/batchSubject',
    route: batchSubjectRoutes
  },
  {
    path: '/batch',
    route: batchRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;