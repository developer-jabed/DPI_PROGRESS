import express from "express";
import { ClassSessionController } from "./classSession.controller";

const router = express.Router();

// POST → Generate all default class sessions for a schedule entry
router.post("/generate-default", ClassSessionController.generateClassSessions);

export const classSessionRoute = router;
