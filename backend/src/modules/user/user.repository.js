import User from "./user.model.js";

/**
 * Repository cho user.
 *
 * Các method chính:
 * - findUserByEmail(email): tìm user theo email
 * - findUserByUsername(username): tìm user theo username
 * - findUserById(id): tìm user theo id
 * - createUser(userData): tạo user mới
 * - updateUserById(id, updateData): cập nhật user
 *
 * Dùng để tách logic truy cập DB khỏi service.
 */

// Tìm user bằng email
export const findUserByEmail = async (email, includePassword = false) => {
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();

  if (!normalizedEmail) return null;

  const query = User.findOne({ email: normalizedEmail });

  if (includePassword) {
    query.select("+password");
  }

  return query.exec();
};

// Tìm user bằng username
export const findUserByUsername = async (username, includePassword = false) => {
  const normalizedUsername = String(username || "")
    .trim()
    .toLowerCase();

  if (!normalizedUsername) return null;

  const query = User.findOne({ username: normalizedUsername });

  if (includePassword) {
    query.select("+password");
  }

  return query.exec();
};

// Tìm user theo ID
export const findUserById = async (id, includePassword = false) => {
  if (!id) return null;

  const query = User.findById(id);

  if (includePassword) {
    query.select("+password");
  }

  return query.exec();
};

// Tạo user mới
export const createUser = async (userData) => {
  return User.create(userData);
};

// Cập nhật user theo ID
export const updateUserById = async (id, updateData) => {
  if (!id) return null;

  return User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};
