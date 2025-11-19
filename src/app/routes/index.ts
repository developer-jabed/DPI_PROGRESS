import express from 'express';
import { userRoutes } from '../modules/users/user.route';
import { batchRoute } from '../modules/batch/batch.route';



const router = express.Router();

const moduleRoutes = [
   {
        path: '/user',
        route: userRoutes
    },
    {
        path : '/batch',
        route: batchRoute
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;