import FriendRequest from "./friendRequest.model.js";

// ==============================
// CREATE
// ==============================
// Tạo lời mời
export const createRequest = (data) => {
  return FriendRequest.create(data);
};

// ==============================
// READ / FIND
// ==============================
// Tìm theo id
export const findById = (id) => {
  return FriendRequest.findById(id);
};

// Tìm lời mời theo chính xác chiều từ sender đến receiver
export const findRequest = (from, to) => {
  return FriendRequest.findOne({ from, to });
};

// Tìm lời mời đang PENDING giữa 2 user (bất kể ai là người gửi)
export const findPendingRequest = (userA, userB) => {
  return FriendRequest.findOne({
    $or: [
      { from: userA, to: userB },
      { from: userB, to: userA },
    ],
    status: "pending",
  });
};

// Kiểm tra xem đã có lời mời PENDING giữa 2 user chưa (Trả về true/false)
export const existsPendingRequest = async (userA, userB) => {
  const result = await FriendRequest.exists({
    $or: [
      { from: userA, to: userB },
      { from: userB, to: userA },
    ],
    status: "pending",
  });
  return Boolean(result);
};

// Danh sách lời mời đã nhận (Mặc định lọc lời mời đang PENDING)
export const findReceivedRequests = (userId) => {
  return FriendRequest.find({
    to: userId,
    status: "pending",
  }).populate("from");
};

// Danh sách lời mời đã gửi (Mặc định lọc lời mời đang PENDING)
export const findSentRequests = (userId) => {
  return FriendRequest.find({
    from: userId,
    status: "pending",
  }).populate("to");
};

// Đếm lời mời đã nhận
export const countReceivedRequests = (userId) => {
  return FriendRequest.countDocuments({
    to: userId,
    status: "pending",
  });
};

// Đếm lời mời đã gửi
export const countSentRequests = (userId) => {
  return FriendRequest.countDocuments({
    from: userId,
    status: "pending",
  });
};

// ==============================
// UPDATE
// ==============================
// Cập nhật trạng thái lời mời (vd: 'accepted', 'rejected')
export const updateRequestStatus = (requestId, status) => {
  return FriendRequest.findByIdAndUpdate(
    requestId,
    { status },
    { returnDocument: "after" }, // Trả về document sau khi đã update
  );
};

// ==============================
// DELETE
// ==============================
// Xóa lời mời
export const deleteById = (id) => {
  return FriendRequest.findByIdAndDelete(id);
};

// Hủy/xóa lời mời trực tiếp giữa 2 user (Ví dụ: Thu hồi lời mời đã gửi)
export const deleteRequest = (from, to) => {
  return FriendRequest.findOneAndDelete({ from, to });
};
