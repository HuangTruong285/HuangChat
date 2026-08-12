import { useEffect, useRef } from "react";

import MessageItem from "./MessageItem";

export default function MessageList({ conversation, messages }) {
  const bottomRef = useRef(null);

  const currentMessages = conversation ? (messages[conversation.id] ?? []) : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentMessages]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {currentMessages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
