import FriendRequest from "./friendRequest.model.js";

// ============================== CREATE ==============================

// Tạo lời mời
export const create = (data) => {
  return FriendRequest.create(data);
};

// ============================== READ / FIND ==============================

// Tìm theo id
export const findById = (id) => {
  return FriendRequest.findById(id);
};

// Tìm lời mời giữa 2 user
export const findRequest = (from, to) => {
  return FriendRequest.findOne({
    from,
    to,
  });
};

// Giống hàm check để 2 người dùng không gửi lời mời trùng cho nhau
export const findRequestBetweenUsers = (userA, userB) => {
  return FriendRequest.findOne({
    $or: [
      { from: userA, to: userB },
      { from: userB, to: userA },
    ],
  });
};

// Danh sách lời mời đã nhận
export const findReceivedRequests = (userId) => {
  return FriendRequest.find({
    to: userId,
  }).populate("from", "-hashedPassword");
};

// Danh sách lời mời đã gửi
export const findSentRequests = (userId) => {
  return FriendRequest.find({
    from: userId,
  }).populate("to", "-hashedPassword");
};

// Đếm lời mời đã nhận
export const countReceivedRequests = (userId) => {
  return FriendRequest.countDocuments({
    to: userId,
  });
};

// Đếm lời mời đã gửi
export const countSentRequests = (userId) => {
  return FriendRequest.countDocuments({
    from: userId,
  });
};

// ============================== DELETE ==============================

// Xóa lời mời
export const deleteById = (id) => {
  return FriendRequest.findByIdAndDelete(id);
};
