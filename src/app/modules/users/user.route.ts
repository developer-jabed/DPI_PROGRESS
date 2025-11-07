import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { fileUploader } from "../../helper/fileUploader";
import { UserService } from "./user.service";

const router = express.Router();

// ===================== GET ALL USERS =====================
router.get("/", UserController.getAllUsers);

// ===================== CREATE STUDENT =====================
router.post(
  "/create-student",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createStudentValidationSchema.parse(req.body);
    return UserController.createStudent(req, res, next);
  }
);

// ===================== CREATE TEACHER =====================
router.post(
  "/create-teacher",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createTeacherValidationSchema.parse(req.body);
    return UserController.createTeacher(req, res, next);
  }
);


// ===================== CREATE CR =====================
router.post(
  "/create-cr",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createCrValidationSchema.parse(req.body);
    return UserController.createCr(req, res, next);
  }
);

// ===================== CREATE ADMIN =====================
router.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
  }
);

// ===================== CREATE FIRST ADMIN (NO AUTH) =====================
router.post("/create-first-admin", UserController.createFirstAdmin);


export const userRoutes = router;
