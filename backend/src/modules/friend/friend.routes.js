import express from "express";
import * as friendController from "./friend.controller.js";

const router = express.Router();

// ==============================
// 1. STATS & STATUS (Các Route tĩnh / Lấy trạng thái)
// ==============================
router.get("/status/:userId", friendController.getRelationshipStatus);

// ==============================
// 2. FRIEND REQUESTS - STATIC ROUTES (Phải đặt TRƯỚC route có :requestId)
// ==============================
router.get("/requests/sent", friendController.getSentRequests);
router.get("/requests/received", friendController.getReceivedRequests);
router.post("/requests", friendController.sendRequest);

// ==============================
// 3. FRIEND REQUESTS - DYNAMIC ROUTES (Có :requestId)
// ==============================
router.patch("/requests/:requestId/accept", friendController.acceptRequest);
router.patch("/requests/:requestId/reject", friendController.rejectRequest);
router.delete("/requests/:requestId", friendController.cancelRequest);

// ==============================
// 4. FRIEND RELATIONSHIPS (Danh sách & Hủy kết bạn)
// ==============================
router.get("/", friendController.getFriends);
router.delete("/:userId", friendController.unfriend);

export default router;
