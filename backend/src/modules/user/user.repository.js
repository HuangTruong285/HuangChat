import User from "./user.model.js";

/*
  create: Tạo user mới
  findById: Tìm user theo id
  findByUsername: Tìm user theo username
  findByEmail: Tìm user theo email
  findByUsernameOrEmail: Tìm user theo username hoặc email
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

// Tìm theo username
export const findByUsername = (username) => {
  return User.findOne({ username });
};

// Tìm theo email
export const findByEmail = (email) => {
  return User.findOne({ email });
};

// Tìm theo username hoặc email
export const findByUsernameOrEmail = (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+password");
};

// Cập nhật thông tin user
export const updateById = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
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
  findByUsernameOrEmail,
  updateById,
  updateStatusById,
  deleteById,
};
