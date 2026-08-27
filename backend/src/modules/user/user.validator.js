import Joi from "joi";

// Cập nhật thông tin cá nhân
const updateProfileSchema = Joi.object({
  displayName: Joi.string().trim().min(1).max(50),

  bio: Joi.string().trim().max(200).allow("", null),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
    "any.required": "Current password is required",
  }),

  newPassword: Joi.string().min(8).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters",
    "any.required": "New password is required",
  }),
});

// Cập nhật trạng thái
const updateStatusSchema = Joi.object({
  status: Joi.string().valid("online", "offline").required(),
});

// Tìm kiếm user
const searchUsersSchema = Joi.object({
  keyword: Joi.string().trim().min(1).max(50).required(),
});

export {
  updateProfileSchema,
  updateStatusSchema,
  changePasswordSchema,
  searchUsersSchema,
};
