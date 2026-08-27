import { Router } from "express";

import * as userController from "./user.controller.js";
import {
  updateProfileSchema,
  updateStatusSchema,
  searchUsersSchema,
} from "./user.validator.js";

import validate from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = Router();

// ==============================
// OTHER USER
// ==============================
router.get("/me", userController.getCurrentUser);

router.patch(
  "/me",
  validate(updateProfileSchema),
  userController.updateProfile,
);

router.patch("/avatar", upload.single("avatar"), userController.updateAvatar);

router.patch(
  "/status",
  validate(updateStatusSchema),
  userController.updateStatus,
);

router.delete("/me", userController.deleteCurrentUser);

// ==============================
// OTHER USER
// ==============================
router.get(
  "/search",
  validate(searchUsersSchema, "query"),
  userController.searchUsers,
);

router.get("/:userId/profile", userController.getPublicProfile);

export default router;
