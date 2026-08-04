import express from "express";
import * as friendController from "./friend.controller.js";

const router = express.Router();

router.patch("/requests", friendController.sendRequest);
router.post("/requests/:requestId/accept", friendController.acceptRequest);
router.patch("/requests/:requestId/reject", friendController.rejectRequest);

router.delete("/requests/:requestId", friendController.cancelRequest);

router.delete("/:friendId", friendController.unfriend);

router.get("/", friendController.getFriends);

router.get("/requests/received", friendController.getReceivedRequests);

router.get("/requests/sent", friendController.getSentRequests);

export default router;
