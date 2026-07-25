export default function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input className="w-full rounded-lg border px-4 py-2 text-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"></input>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Mật khẩu
        </label>
        <input className="w-full rounded-lg border px-4 py-2 text-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"></input>
      </div>
      <button className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50">
        Đăng nhập
      </button>
    </form>
  );
}
