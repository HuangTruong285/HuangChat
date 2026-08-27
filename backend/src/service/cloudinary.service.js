import cloudinary from "../config/cloudinary.js";

// upload hình ảnh
export const uploadImage = async (filePath, options = {}) => {
  return cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    ...options,
  });
};

// Hàm xoá ảnh
export const deleteImage = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};
