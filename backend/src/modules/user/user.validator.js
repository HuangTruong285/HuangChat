import Joi from "joi";

// Cập nhật thông tin cá nhân
export const updateProfileSchema = Joi.object({
  displayName: Joi.string().trim().min(1).max(50).required(),
});

// Cập nhật avatar
export const updateAvatarSchema = Joi.object({
  avatar: Joi.string().uri().allow(null).required(),
});

// Cập nhật trạng thái
export const updateStatusSchema = Joi.object({
  status: Joi.string().valid("online", "offline").required(),
});

// Tìm kiếm user
export const searchUsersSchema = Joi.object({
  keyword: Joi.string().trim().min(1).max(50).required(),
});
