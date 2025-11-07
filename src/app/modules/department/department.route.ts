import express from "express";
import { DepartmentController } from "./department.controller";

const router = express.Router();

router.post("/", DepartmentController.createDepartment);
router.get("/", DepartmentController.getAllDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.patch("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);

export const departmentRoute = router;
