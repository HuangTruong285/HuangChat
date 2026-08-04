import express from "express";
import * as friendController from "./friend.controller.js";

const router = express.Router();

router.post("/requests", friendController.addFriend);
router.post(
  "/requests/:requestId/accept",
  friendController.acceptFriendRequest,
);
router.post(
  "/requests/:requestId/decline",
  friendController.declineFriendRequest,
);

router.get("/", friendController.getAllFriends);
router.get("/requests", friendController.getFriendsRequest);

export default router;
