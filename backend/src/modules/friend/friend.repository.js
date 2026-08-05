import Friend from "./friend.model.js";

// ============================== CREATE ==============================

// Tạo quan hệ bạn bè
export const create = (data) => {
  return Friend.create(data);
};

// ============================== READ / FIND ==============================

// Tìm theo id
export const findById = (id) => {
  return Friend.findById(id);
};

// Tìm quan hệ giữa 2 user
export const findFriend = (userA, userB) => {
  return Friend.findOne({
    $or: [
      { userA, userB },
      { userA: userB, userB: userA },
    ],
  });
};

// Lấy danh sách bạn bè của user
export const findFriends = (userId) => {
  return Friend.find({
    $or: [{ userA: userId }, { userB: userId }],
  })
    .populate("userA", "-hashedPassword")
    .populate("userB", "-hashedPassword");
};

// Đếm số bạn bè
export const countFriends = (userId) => {
  return Friend.countDocuments({
    $or: [{ userA: userId }, { userB: userId }],
  });
};

// ============================== DELETE ==============================

// Xóa quan hệ bạn bè
export const deleteById = (id) => {
  return Friend.findByIdAndDelete(id);
};
