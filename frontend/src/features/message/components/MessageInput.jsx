import { Paperclip, Send, Smile, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function MessageInput({ onSendMessage, disabled }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    await onSendMessage(content);

    setContent("");
  };

  return (
    <div className="border-sidebar-border bg-sidebar border-t p-4">
      <div className="border-input bg-background text-foreground flex items-center space-x-2 rounded-2xl border p-2 transition-colors">
        <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSend();
              }
            }}
            placeholder="Type a message..."
            disabled={disabled}
            className="text-foreground flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-slate-500 focus:ring-0 focus:outline-none"
          />

          {/* Emoji & Send Button */}
          <button className="p-2 text-slate-400 transition-colors hover:text-amber-400">
            <Smile size={18} />
          </button>
          <button
            type="submit"
            disabled={disabled || !content.trim()}
            className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
