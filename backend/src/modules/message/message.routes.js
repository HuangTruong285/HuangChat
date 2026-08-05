import { Router } from "express";

import * as messageController from "./message.controller.js";

const router = Router();

router.post("/", messageController.sendMessage);

router.get("/:conversationId", messageController.getMessages);

router.delete("/:messageId", messageController.deleteMessage);

export default router;
