import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

export default function RegisterForm({ onSwitchForm }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username.trim()) {
      setError("Username không được để trống");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email không được để trống");
      return;
    }
    if (!formData.password) {
      setError("Mật khẩu không được để trống");
      return;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (!formData.confirmPassword) {
      setError("Vui lòng xác nhận lại mật khẩu");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp");
      return;
    }

    try {
      const { confirmPassword, ...registerPayload } = formData;
      await register(registerPayload);
      navigate("/chat", { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Đăng ký thất bại. Vui lòng thử lại!";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
      <h2 className="text-3xl font-bold text-gray-900">Đăng ký</h2>
      <p className="mt-2 text-gray-500">Tạo tài khoản mới</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            disabled={loading}
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-3 transition outline-none focus:border-indigo-600 disabled:bg-gray-100"
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            disabled={loading}
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-3 transition outline-none focus:border-indigo-600 disabled:bg-gray-100"
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            disabled={loading}
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-3 transition outline-none focus:border-indigo-600 disabled:bg-gray-100"
          />
        </div>

        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            disabled={loading}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-3 transition outline-none focus:border-indigo-600 disabled:bg-gray-100"
          />
        </div>

        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Đã có tài khoản?{" "}
        <button
          onClick={onSwitchForm}
          type="button"
          disabled={loading}
          className="font-medium text-indigo-600 hover:underline disabled:opacity-50"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}
