import User from "./user.model.js";

// ============================== 1. CREATE ==============================

//Tạo một User mới trong CSDL
export const create = (data) => {
  return User.create(data);
};

// ============================== 2. READ / FIND ==============================

// Tìm User theo ID (Mặc định ẩn password)
export const findById = (id) => {
  return User.findById(id);
};

// Tìm User theo ID và LẤY KÈM password (Dùng cho xác thực/đổi mật khẩu)
export const findByIdWithPassword = (id) => {
  return User.findById(id).select("+password");
};

// Lấy thông tin công khai của User (Thích hợp cho Profile public)
export const findPublicById = (id) => {
  return User.findById(id).select(
    "username displayName avatar bio status lastSeen",
  );
};

// Tìm User theo Username
export const findByUsername = (username) => {
  return User.findOne({ username });
};

// Tìm User theo Email
export const findByEmail = (email) => {
  return User.findOne({ email });
};

// Tìm User bằng Username HOẶC Email + lấy kèm password (Dùng cho Đăng nhập)
export const findByIdentifier = (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+password");
};

// Kiểm tra xem Username đã tồn tại chưa (Trả về {_id} hoặc null)
export const existsByUsername = (username) => {
  return User.exists({ username });
};

// Kiểm tra xem Email đã tồn tại chưa (Trả về {_id} hoặc null)
export const existsByEmail = (email) => {
  return User.exists({ email });
};

// Tìm kiếm User theo keyword (Khớp với username hoặc displayName)
export const search = (keyword, limit = 20) => {
  return User.find({
    $or: [
      { username: { $regex: keyword, $options: "i" } },
      { displayName: { $regex: keyword, $options: "i" } },
    ],
  })
    .select("username displayName avatar status")
    .limit(limit);
};

// Lấy danh sách User có phân trang, sắp xếp mới nhất lên đầu
export const findAll = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return User.find().skip(skip).limit(limit).sort({ createdAt: -1 });
};

// Đếm tổng số bản ghi khớp điều kiện
export const count = (filter = {}) => {
  return User.countDocuments(filter);
};

// ============================== 3. UPDATE ==============================

// Cập nhật bất kỳ trường nào của User theo ID
export const updateById = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

// Cập nhật riêng thông tin cá nhân (Profile)
export const updateProfile = (id, data) => {
  return User.findByIdAndUpdate(id, { $set: data }, { new: true });
};

// Cập nhật trạng thái Online/Offline và thời gian tương tác cuối

export const updateStatusById = (id, { status, lastSeen }) => {
  return User.findByIdAndUpdate(id, { status, lastSeen }, { new: true });
};

// Cập nhật mật khẩu băm mới
export const updatePassword = (id, password) => {
  return User.findByIdAndUpdate(id, { password }, { new: true });
};

// Đánh dấu email đã được xác minh
export const markVerified = (id) => {
  return User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
};

// Khóa hoặc mở khóa tài khoản người dùng
export const updateActiveStatus = (id, isActive) => {
  return User.findByIdAndUpdate(id, { isActive }, { new: true });
};

// ============================== 4. DELETE ==============================

// Xóa vĩnh viễn User theo ID
export const deleteById = (id) => {
  return User.findByIdAndDelete(id);
};

// ============================== EXPORT DEFAULT ==============================

export default {
  create,

  findById,
  findByIdWithPassword,
  findPublicById,
  findByUsername,
  findByEmail,
  findByIdentifier,
  existsByUsername,
  existsByEmail,
  search,
  findAll,
  count,

  updateById,
  updateProfile,
  updateStatusById,
  updatePassword,
  markVerified,
  updateActiveStatus,

  deleteById,
};
