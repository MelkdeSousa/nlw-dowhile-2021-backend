import { Router } from "express";

import { Message as MessageController } from "../controllers/Message";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const messageController = new MessageController();

const router = Router();

router.post("/message", ensureAuthenticated, messageController.create);
router.get("/message", messageController.message);

export default router;
