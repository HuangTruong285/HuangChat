import { Router } from "express";

import * as conversationController from "./conversation.controller.js";

const router = Router();

router.post("/direct", conversationController.createDirectConversation);

router.post("/group", conversationController.createGroupConversation);

router.get("/", conversationController.getMyConversations);

router.get("/:conversationId", conversationController.getConversation);

router.post(
  "/:conversationId/participants",
  conversationController.addParticipant,
);

router.delete(
  "/:conversationId/participants/:userId",
  conversationController.removeParticipant,
);

export default router;
