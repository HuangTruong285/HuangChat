import { Paperclip, Send, Smile, Image as ImageIcon } from "lucide-react";

export default function MessageInput({ value, onChange, onSend }) {
  return (
    <div className="border-t border-slate-800 bg-slate-900/30 p-4">
      <div className="flex items-center space-x-2 rounded-2xl border border-slate-800 bg-slate-900 p-2 transition-colors focus-within:border-indigo-500/50">
        {/* Nút đính kèm file/ảnh */}
        <button className="p-2 text-slate-400 transition-colors hover:text-indigo-400">
          <Paperclip size={18} />
        </button>
        <button className="p-2 text-slate-400 transition-colors hover:text-indigo-400">
          <ImageIcon size={18} />
        </button>

        {/* Input chính */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 bg-transparent px-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
        />

        {/* Emoji & Send Button */}
        <button className="p-2 text-slate-400 transition-colors hover:text-amber-400">
          <Smile size={18} />
        </button>
        <button
          onClick={onSend}
          className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
