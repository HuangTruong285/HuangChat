export default function MessageItem({ message }) {
  const isMine = message.sender === "me";

  return (
    <div
      className={`flex items-start space-x-2 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      {isMine ? null : (
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
          alt="Avatar"
          className="mt-1 h-8 w-8 rounded-full object-cover"
        />
      )}
      <div className="max-w-[70%]">
        <div
          className={`rounded-2xl p-3 text-sm text-slate-200 ${
            isMine
              ? "rouded-tr-none bg-indigo-600"
              : "rounded-tl-none bg-slate-800"
          }`}
        >
          {message.content}
        </div>
        <span
          className={`mt-1 block text-[10px] text-slate-500 ${
            isMine ? "pr-1 text-right" : "pl-1"
          }`}
        >
          {message.time}
        </span>
      </div>
    </div>
  );
}
