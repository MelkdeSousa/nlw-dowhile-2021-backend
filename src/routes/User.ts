import { Router } from "express";

import { User as UserController } from "../controllers/User";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userController = new UserController();

const router = Router();

router.get("/user", ensureAuthenticated, userController.profile);

export default router;
