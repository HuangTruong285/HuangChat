import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (filePath, options = {}) => {
  return cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    ...options,
  });
};

export const deleteImage = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};
