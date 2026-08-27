import User from "./user.model.js";

// ==============================
// CREATE
// ==============================
const create = async (data) => {
  return User.create(data);
};

// ==============================
// READ / FIND
// ==============================
const findById = async (id) => {
  return User.findById(id);
};

const findPublicById = async (id) => {
  return User.findById(id).select(
    "username displayName bio avatarUrl status lastSeen",
  );
};

const findByUsername = async (username) => {
  return User.findOne({ username });
};

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const findByIdentifier = async (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("+hashedPassword");
};

const existsByUsername = async (username) => {
  return User.exists({ username });
};

const existsByEmail = async (email) => {
  return User.exists({ email });
};

const search = async (keyword) => {
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return User.find({
    $or: [
      { username: { $regex: escapedKeyword, $options: "i" } },
      { displayName: { $regex: escapedKeyword, $options: "i" } },
    ],
  }).select("username displayName avatarUrl status");
};

// ==============================
// UPDATE
// ==============================
const updateProfile = async (id, data) => {
  return User.findByIdAndUpdate(
    id,
    { $set: data },
    { returnDocument: "after", runValidators: true },
  );
};

const updateStatus = async (id, status) => {
  return User.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: "after", runValidators: true },
  );
};

const updatePassword = async (id, hashedPassword) => {
  return User.findByIdAndUpdate(
    id,
    { $set: { hashedPassword } },
    { runValidators: true },
  );
};

// ==============================
// DELETE
// ==============================
const deleteById = async (id) => {
  return User.findByIdAndDelete(id);
};

export {
  create,
  findById,
  findPublicById,
  findByUsername,
  findByEmail,
  findByIdentifier,
  existsByUsername,
  existsByEmail,
  search,
  updateProfile,
  updateStatus,
  updatePassword,
  deleteById,
};
