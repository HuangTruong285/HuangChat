import User from "./user.model.js";

// ============================== 1. CREATE ==============================

//Tạo một User mới
export const create = (data) => {
  return User.create(data);
};

// ============================== 2. READ / FIND ==============================

// Tìm User theo ID
export const findById = (id) => {
  return User.findById(id);
};

// Tìm User theo ID và và không có mật khẩu
export const findByIdWithoutPassword = (id) => {
  return User.findById(id).select("-hashedPassword");
};

// Lấy thông tin công khai của User (Thích hợp cho Profile public)
export const findPublicById = (id) => {
  return User.findById(id).select("username displayName avatar status");
};

// Tìm User bằng Username HOẶC Email + lấy kèm password (Dùng cho Đăng nhập)
export const findByIdentifier = (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
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
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return User.find({
    $or: [
      { username: { $regex: escapedKeyword, $options: "i" } },
      { displayName: { $regex: escapedKeyword, $options: "i" } },
    ],
  })
    .select("username displayName avatar status")
    .limit(limit);
};

// Lấy danh sách User có phân trang, sắp xếp mới nhất lên đầu
export const findAll = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return User.find()
    .select("-hashedPassword")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
};

// Đếm tổng số bản ghi khớp điều kiện
export const count = (filter = {}) => {
  return User.countDocuments(filter);
};

// ============================== 3. UPDATE ==============================

// Cập nhật bất kỳ trường nào của User theo ID
export const updateById = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-hashedPassword");
};

// Cập nhật riêng thông tin cá nhân (Profile)
export const updateProfile = (id, data) => {
  return User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  ).select("-hashedPassword");
};

// Cập nhật trạng thái Online/Offline và thời gian tương tác cuối
export const updateStatusById = (id, status) => {
  return User.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  ).select("-hashedPassword");
};

// Cập nhật mật khẩu băm mới
export const updatePassword = (id, hashedPassword) => {
  return User.findByIdAndUpdate(id, { hashedPassword }, { new: true });
};

// ============================== 4. DELETE ==============================

// Xóa vĩnh viễn User theo ID
export const deleteById = (id) => {
  return User.findByIdAndDelete(id);
};
