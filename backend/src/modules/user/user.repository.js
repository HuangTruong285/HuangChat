import User from "./user.model.js";

// ============================== CREATE ==============================

// Tạo một người dùng mới
export const create = async (data) => {
  return User.create(data);
};

// ============================== READ / FIND ==============================

// Tìm người dùng theo ID (Trả về đầy đủ thông tin)
export const findById = async (id) => {
  return User.findById(id);
};

// Tìm người dùng theo ID nhưng chỉ lấy thông tin công khai (Dùng để hiển thị profile cho người khác xem)
export const findPublicById = async (id) => {
  return User.findById(id).select("username displayName avatarUrl status");
};

// Tìm người dùng theo Tên tài khoản (username)
export const findByUsername = async (username) => {
  return User.findOne({ username });
};

// Tìm người dùng theo Email
export const findByEmail = async (email) => {
  return User.findOne({ email });
};

// Tìm người dùng bằng Username HOẶC Email (Thường dùng khi đăng nhập bằng 1 trong 2)
export const findByIdentifier = async (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+hashedPassword");
};

// Kiểm tra xem Username đã tồn tại trong hệ thống chưa (trả về true/false hoặc object id/null)
export const existsByUsername = async (username) => {
  return User.exists({ username });
};

// Kiểm tra xem Email đã tồn tại trong hệ thống chưa
export const existsByEmail = async (email) => {
  return User.exists({ email });
};

// Tìm kiếm danh sách người dùng theo keyword (Khớp với username hoặc displayName)
export const search = async (keyword) => {
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return User.find({
    $or: [
      { username: { $regex: escapedKeyword, $options: "i" } },
      { displayName: { $regex: escapedKeyword, $options: "i" } },
    ],
  }).select("username displayName avatarUrl status");
};

// ============================== UPDATE ==============================

// Cập nhật thông tin cá nhân (Profile) theo ID
export const updateProfile = async (id, data) => {
  return User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );
};

// Cập nhật trạng thái hoạt động (online/offline)
export const updateStatus = async (id, status) => {
  return User.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
};

// Cập nhật/Đổi mật khẩu mới đã mã hóa
export const updatePassword = async (id, hashedPassword) => {
  return User.findByIdAndUpdate(
    id,
    { $set: { hashedPassword } },
    { runValidators: true },
  );
};

// ============================== DELETE ==============================

// Xóa tài khoản người dùng theo ID
export const deleteById = async (id) => {
  return User.findByIdAndDelete(id);
};
