import User from "./user.model.js";

/*
  create: Tạo user mới
  findById: Tìm user theo id
  findByUsername: Tìm user theo username
  findByEmail: Tìm user theo email
  findForAuth: Tìm user theo username hoặc email
  updateById: Cập nhật thông tin user
  updateStatusById: Cập nhật trạng thái online/offline của user
  deleteById: Xoá user theo id
*/

// Tạo user mới
export const create = (data) => {
  return User.create(data);
};

// Tìm theo id
export const findById = (id) => {
  return User.findById(id);
};

// Lấy thông tin public của user
const findPublicById = (id) => {
  return User.findById(id).select("username avatar status lastSeen");
};

// Tìm theo username
export const findByUsername = (username) => {
  return User.findOne({ username });
};

// Tìm theo email
export const findByEmail = (email) => {
  return User.findOne({ email });
};

// Tìm theo username hoặc email
export const findForAuth = (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+password");
};

// Kiểm tra username đã tồn tại
const existsByUsername = (username) => {
  User.exists({ username });
};

// Kiểm tra email đã tồn tại
const existsByEmail = (email) => {
  User.exists({ email });
};

// Cập nhật thông tin user
export const updateById = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Tìm kiến User
const search = (keyword) => {
  User.find({
    $or: [
      {
        username: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        displayName: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  }).limit(20);
};

// Cập nhật trang thái online/offline của user
export const updateStatusById = (id, status) => {
  return User.findByIdAndUpdate(
    id,
    {
      status,
      lastSeen: status === "offline" ? new Date() : null,
    },
    { new: true },
  );
};

// Xoá user theo id
export const deleteById = (id) => {
  return User.findByIdAndDelete(id);
};

export default {
  create,
  findById,
  findByUsername,
  findByEmail,
  findPublicById,
  findForAuth,
  existsByUsername,
  existsByEmail,
  updateById,
  search,
  updateStatusById,
  deleteById,
};
