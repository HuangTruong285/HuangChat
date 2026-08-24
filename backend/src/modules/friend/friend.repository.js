import Friend from "./friend.model.js";

// ==============================
// CREATE
// ==============================
// Tạo quan hệ bạn bè
export const createFriend = async (data) => {
  return Friend.create(data);
};

// ==============================
// READ / FIND
// ==============================
// Tìm theo id
export const findById = async (id) => {
  return Friend.findById(id);
};

// Tìm quan hệ giữa 2 user
export const findFriend = async (userA, userB) => {
  return Friend.findOne({
    $or: [
      { userA, userB },
      { userA: userB, userB: userA },
    ],
  });
};

// Lấy danh sách bạn bè của user
export const findFriends = async (userId) => {
  return Friend.find({
    $or: [{ userA: userId }, { userB: userId }],
  })
    .populate("userA")
    .populate("userB");
};

// Kiểm tra xem 2 user đã là bạn bè chưa
export const existsFriend = async (userA, userB) => {
  const result = await Friend.exists({
    $or: [
      { userA, userB },
      { userA: userB, userB: userA },
    ],
  });
  return Boolean(result); // ép kiểu về true nếu có object {_id}, hoặc false nếu null
};

// Đếm số bạn bè
export const countFriends = async (userId) => {
  return Friend.countDocuments({
    $or: [{ userA: userId }, { userB: userId }],
  });
};

// ==============================
// DELETE
// ==============================
// Xóa quan hệ bạn bè
export const deleteById = async (id) => {
  return Friend.findByIdAndDelete(id);
};

// Xóa quan hệ bạn bè giữa 2 user
export const deleteFriend = async (userA, userB) => {
  return Friend.findOneAndDelete({
    $or: [
      { userA, userB },
      { userA: userB, userB: userA },
    ],
  });
};
