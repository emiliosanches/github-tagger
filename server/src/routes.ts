import { Router } from "express";
import { modules } from "./modules";

const authController = modules.auth.controller;

const router = Router();

router.post("/auth", (req, res) => authController.authByCode(req, res));

export { router };
