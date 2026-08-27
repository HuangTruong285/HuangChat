import { useState, useRef } from "react";
import { Paperclip, Send, Smile, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MessageInput({ onSendMessage, disabled }) {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  // Tự động điều chỉnh chiều cao của textarea theo số dòng chữ
  const handleInput = (e) => {
    setContent(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleSend = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || disabled) return;

    await onSendMessage(trimmedContent);

    // Reset nội dung và chiều cao textarea
    setContent("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e) => {
    // Nhấn Enter để gửi (Shift + Enter để xuống dòng)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="border-border bg-sidebar border-t p-3 sm:p-4">
        {/* Hidden inputs cho File & Image Upload */}
        <form
          onSubmit={handleSubmit}
          className="border-input bg-background focus-within:ring-ring flex items-end gap-1.5 rounded-2xl border p-2 shadow-xs transition-all focus-within:ring-1"
        >
          {/* Nút đính kèm file */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="text-muted-foreground hover:text-foreground h-9 w-9 shrink-0 rounded-xl"
                aria-label="Đính kèm tệp"
              >
                <Paperclip size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Đính kèm tệp</TooltipContent>
          </Tooltip>

          {/* Nút gửi ảnh */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="text-muted-foreground hover:text-foreground h-9 w-9 shrink-0 rounded-xl"
              >
                <ImageIcon size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Gửi hình ảnh</TooltipContent>
          </Tooltip>

          {/* Textarea nhập tin nhắn đa dòng */}
          <Textarea
            ref={textareaRef}
            rows={1}
            value={content}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn..."
            disabled={disabled}
            className="text-foreground placeholder:text-muted-foreground max-h-30 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none"
          />

          {/* Nút Emoji */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="text-muted-foreground hover:text-foreground h-9 w-9 shrink-0 rounded-xl"
              >
                <Smile size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Biểu tượng cảm xúc</TooltipContent>
          </Tooltip>

          {/* Nút Gửi */}
          <Button
            type="submit"
            size="icon"
            disabled={disabled || !content.trim()}
            className="h-9 w-9 shrink-0 rounded-xl shadow-xs transition-transform active:scale-95"
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </TooltipProvider>
  );
}
