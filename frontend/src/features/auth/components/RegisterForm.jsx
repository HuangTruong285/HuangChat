import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";

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
    <div className="border-border bg-card shadow-primary/5 w-full max-w-md rounded-2xl border p-8 shadow-lg">
      {/* ============================== HEADER ============================== */}
      <div>
        <h2 className="text-card-foreground text-3xl font-bold tracking-tight">
          Đăng ký
        </h2>

        <p className="text-muted-foreground mt-2">Tạo tài khoản mới</p>
      </div>

      {/* ============================== FORM ============================== */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            disabled={loading}
            value={formData.username}
            onChange={handleChange}
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/30 w-full rounded-xl border px-4 py-3 transition outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/30 w-full rounded-xl border px-4 py-3 transition outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring/30 w-full rounded-xl border px-4 py-3 transition outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>

      {/* ============================== SWITCH ============================== */}
      <p className="text-muted-foreground mt-6 text-center text-sm">
        Đã có tài khoản?{" "}
        <button
          onClick={onSwitchForm}
          type="button"
          disabled={loading}
          className="text-primary font-semibold transition hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}
