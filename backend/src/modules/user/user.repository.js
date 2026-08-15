import User from "./user.model.js";

// ============================== CREATE ==============================

export const create = async (data) => {
  return User.create(data);
};

// ============================== READ / FIND ==============================

export const findById = async (id) => {
  return User.findById(id);
};

export const findPublicById = async (id) => {
  return User.findById(id).select("username displayName avatar status");
};

export const findByUsername = async (username) => {
  return User.findOne({ username });
};

export const findByEmail = async (email) => {
  return User.findOne({ email });
};

// Tìm User bằng Username HOẶC Email + lấy kèm password (Dùng cho Đăng nhập)
export const findByIdentifier = async (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
};

export const existsByUsername = async (username) => {
  return User.exists({ username });
};

export const existsByEmail = async (email) => {
  return User.exists({ email });
};

// Tìm kiếm User theo keyword (Khớp với username hoặc displayName)
export const search = async (keyword) => {
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return User.find({
    $or: [
      { username: { $regex: escapedKeyword, $options: "i" } },
      { displayName: { $regex: escapedKeyword, $options: "i" } },
    ],
  }).select("username displayName avatar status");
};

// ============================== UPDATE ==============================

export const updateProfile = async (id, data) => {
  return User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  ).select("-hashedPassword");
};

export const updateStatus = async (id, status) => {
  return User.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  ).select("-hashedPassword");
};

export const updatePassword = async (id, hashedPassword) => {
  return User.findByIdAndUpdate(id, { hashedPassword }, { new: true });
};

// ============================== DELETE ==============================

export const deleteById = async (id) => {
  return User.findByIdAndDelete(id);
};
