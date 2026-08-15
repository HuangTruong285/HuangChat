import axios from "axios";
import { API } from "../constants/api.js";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "../utils/token.js";

// ============================== KHỞI TẠO ==============================
// Khởi tạo Axios Instance chính dùng cho toàn bộ ứng dụng
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Cho phép gửi Cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================== REQUEST INTERCEPTOR ==============================
// Tự động đính kèm Access Token vào Header
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ============================== REFRESH ==============================
// Quản lý trạng thái Refresh Token
let isRefreshing = false; // Có tiến trình nào xin cấp lại token mới không
let refreshSubscribers = []; // Hàng đợi mảng lưu các request bị lỗi 401 phát sinh trong lúc token đang được làm mới

// Hàm giải phòng các request đang chờ trong hàng đợi
const processQueue = (error, token = null) => {
  refreshSubscribers.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  refreshSubscribers = [];
};

// ============================== RESPONSE INTERCEPTOR ==============================
// Xử lý tự động Refresh Token khi gặp lỗi 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Nếu không có response hoặc lỗi không phải 401 hoặc request này đã từng retry 1 lần -> Báo lỗi ngay
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Nếu chính API refresh token trả về 401 -> Refresh token hết hạn -> Xóa token và reject
    if (originalRequest.url?.includes(API.AUTH.REFRESH)) {
      removeAccessToken();
      return Promise.reject(error);
    }

    // Nếu đang có một request khác thực hiện Refresh Token -> Đưa request này vào hàng đợi
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshSubscribers.push({
          resolve,
          reject,
        });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // Đánh dấu bắt đầu quá trình Refresh Token
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Dùng `axios` gốc thay vì `api` instance để tránh dính Request Interceptor cũ
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}${API.AUTH.REFRESH}`,
        {},
        { withCredentials: true },
      );

      const accessToken = data.data.accessToken;

      setAccessToken(accessToken);

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);

      removeAccessToken();

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
