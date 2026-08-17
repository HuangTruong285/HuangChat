import { Router } from "express";

import * as messageController from "./message.controller.js";

import upload from "../../middleware/upload.middleware.js";

const router = Router();

router.post("/", upload.single("image"), messageController.sendMessage);

router.get("/:conversationId", messageController.getMessages);

router.delete("/:messageId", messageController.deleteMessage);

export default router;
