import Friend from "./friend.model.js";

// ============================== CREATE ==============================

// Tạo quan hệ bạn bè
export const create = async (data) => {
  return Friend.create(data);
};

// ============================== READ / FIND ==============================

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
    .populate("userA", "-hashedPassword")
    .populate("userB", "-hashedPassword");
};

// Đếm số bạn bè
export const countFriends = async (userId) => {
  return Friend.countDocuments({
    $or: [{ userA: userId }, { userB: userId }],
  });
};

// ============================== DELETE ==============================

// Xóa quan hệ bạn bè
export const deleteById = async (id) => {
  return Friend.findByIdAndDelete(id);
};
