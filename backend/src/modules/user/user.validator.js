import Joi from "joi";

// Cập nhật thông tin cá nhân
const updateProfileSchema = Joi.object({
  displayName: Joi.string().trim().min(1).max(50),

  bio: Joi.string().trim().max(200).allow("", null),
});

// Cập nhật trạng thái
const updateStatusSchema = Joi.object({
  status: Joi.string().valid("online", "offline").required(),
});

// Tìm kiếm user
const searchUsersSchema = Joi.object({
  keyword: Joi.string().trim().min(1).max(50).required(),
});

export { updateProfileSchema, updateStatusSchema, searchUsersSchema };
