import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../useAuth";

export default function LoginForm({ onSwitchForm }) {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
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

    if (!formData.identifier.trim()) {
      setError("Tên đăng nhập hoặc email không được để trống");
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
    <div className="border-border bg-card shadow-primary/5 w-full max-w-md rounded-2xl border p-8 shadow-lg">
      {/* ============================== HEADER ============================== */}
      <div>
        <h2 className="text-card-foreground text-3xl font-bold tracking-tight">
          Đăng nhập
        </h2>

        <p className="text-muted-foreground mt-2">Chào mừng bạn quay trở lại</p>
      </div>

      {/* ============================== FORM ============================== */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <input
            type="text"
            name="identifier"
            placeholder="Tên đăng nhập hoặc Email"
            disabled={loading}
            value={formData.identifier}
            onChange={handleChange}
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/30 w-full rounded-xl border px-4 py-3 transition outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/30 w-full rounded-xl border px-4 py-3 transition outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* ============================== ERROR ============================== */}
        {error && (
          <p className="text-destructive text-sm font-medium">{error}</p>
        )}

        {/* ============================== SUBMIT ============================== */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground shadow-primary/15 hover:bg-primary/90 w-full rounded-xl p-3 font-semibold shadow-md transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      {/* ============================== SWITCH ============================== */}
      <p className="text-muted-foreground mt-6 text-center text-sm">
        Chưa có tài khoản?{" "}
        <button
          onClick={onSwitchForm}
          type="button"
          disabled={loading}
          className="text-primary font-semibold transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Đăng ký
        </button>
      </p>
    </div>
  );
}
