import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";

export default function LoginForm({ onSwitchForm }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/chat";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (error) {
      setError("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim()) {
      setError("Email không được để trống");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email không hợp lệ");
      return;
    }
    if (!formData.password) {
      setError("Mật khẩu không được để trống");
      return;
    }

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Đăng nhập thất bại. Vui lòng thử lại!";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
      <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
      <p className="mt-2 text-gray-500">Chào mừng bạn quay trở lại</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            disabled={loading}
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-3 transition outline-none focus:border-indigo-600 disabled:bg-gray-100"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            disabled={loading}
            value={formData.password}
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
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Chưa có tài khoản?{" "}
        <button
          onClick={onSwitchForm}
          type="button"
          disabled={loading}
          className="font-medium text-indigo-600 hover:underline disabled:opacity-50"
        >
          Đăng ký
        </button>
      </p>
    </div>
  );
}
