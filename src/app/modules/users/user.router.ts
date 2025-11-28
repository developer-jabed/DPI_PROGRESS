import express, { NextFunction, Request, Response } from 'express';
import { userValidation } from './user.validation';
import { fileUploader } from '../../helper/fileUploader';
import { userController } from './user.conroller';

const router = express.Router();

// ---------------- GET ALL USERS ----------------
router.get('/', userController.getAllFromDB);

// ---------------- GET MY PROFILE ----------------
router.get('/me', userController.getMyProfile);

// ---------------- CREATE ADMIN ----------------
router.post(
    "/create-admin",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
        return userController.createAdmin(req, res, next);
    }
);

// ---------------- CREATE TEACHER ----------------
router.post(
    "/create-teacher",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createTeacher.parse(JSON.parse(req.body.data));
        return userController.createTeacher(req, res, next);
    }
);

// ---------------- CREATE STUDENT ----------------
router.post(
    "/create-student",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createStudent.parse(JSON.parse(req.body.data));
        return userController.createStudent(req, res, next);
    }
);

// ---------------- CREATE CR ----------------
router.post(
    "/create-cr",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = userValidation.createCr.parse(JSON.parse(req.body.data));
        return userController.createCr(req, res, next);
    }
);

// ---------------- CHANGE PROFILE STATUS ----------------
router.patch(
    '/:id/status',
    userController.changeProfileStatus
);

// ---------------- UPDATE MY PROFILE ----------------
router.patch(
    "/update-my-profile",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        return userController.updateMyProfile(req, res, next);
    }
);

export const userRoutes = router;
