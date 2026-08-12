import { useState } from "react";

import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const initialMessages = {
  1: [
    {
      id: 1,
      sender: "other",
      content: "Hôm nay thế nào?",
      time: "10:30",
    },
    {
      id: 2,
      sender: "me",
      content: "Tớ khỏe, còn cậu?",
      time: "10:31",
    },
    {
      id: 3,
      sender: "other",
      content: "Tớ cũng khỏe 😄",
      time: "10:32",
    },
    {
      id: 4,
      sender: "me",
      content: "Tối nay đi chơi không?",
      time: "10:33",
    },
  ],

  2: [
    {
      id: 5,
      sender: "other",
      content: "Có rảnh không?",
      time: "09:10",
    },
    {
      id: 6,
      sender: "me",
      content: "Có, sao vậy?",
      time: "09:12",
    },
  ],

  3: [
    {
      id: 7,
      sender: "other",
      content: "Tối nay chơi không?",
      time: "08:40",
    },
    {
      id: 8,
      sender: "me",
      content: "Ok 👍",
      time: "08:42",
    },
  ],
};

export default function ChatLayout() {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    if (!activeConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      content: messageInput.trim(),
      time: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => ({
      ...prevMessages,

      [activeConversation.id]: [
        ...(prevMessages[activeConversation.id] ?? []),
        newMessage,
      ],
    }));

    setMessageInput("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSelectConversation={setActiveConversation} />

      {/* Chat */}
      <main className="flex min-w-0 flex-1 flex-col bg-slate-900">
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} />
            <MessageList
              conversation={activeConversation}
              messages={messages}
            />
            <MessageInput
              value={messageInput}
              onChange={setMessageInput}
              onSend={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-slate-500">
                Chọn một cuộc trò chuyện
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Chọn một người để bắt đầu trò chuyện
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
