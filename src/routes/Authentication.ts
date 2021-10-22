import { Router } from "express";

import { Authentication as AuthenticationController } from "../controllers/Authentication";

const authenticationController = new AuthenticationController();

const router = Router();

router.get("/login/github", authenticationController.login);
router.get("/login/callback", authenticationController.callback);
router.post("/authenticate", authenticationController.authenticate);

export default router;
