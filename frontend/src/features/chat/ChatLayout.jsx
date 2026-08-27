import { useState, useEffect } from "react";

import ConversationSidebar from "../conversation/components/ConversationSidebar";
import ChatHeader from "../message/components/ChatHeader";
import MessageList from "../message/components/MessageList";
import MessageInput from "../message/components/MessageInput";
import useAuth from "../auth/useAuth";

import * as conversationService from "../conversation/conversation.service";
import * as messageService from "../message/message.service";

export default function ChatLayout() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // ==============================
  // LOAD CONVERSATIONS
  // ==============================
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoadingConversations(true);
        const data = await conversationService.getMyConversations();
        setConversations(data);
      } catch (error) {
        console.error("Failed to load conversations:", error);
      } finally {
        setLoadingConversations(false);
      }
    };

    loadConversations();
  }, []);

  // ==============================
  // SELECT CONVERSATION
  // ==============================
  const handleSelectConversation = async (conversation) => {
    try {
      setActiveConversation(conversation);
      setLoadingMessages(true);

      const data = await messageService.getMessageByConversation(
        conversation.id,
      );

      const mappedMessages = data.map((message) => ({
        ...message,
        isMine: message.sender.id === user?.id,
      }));

      setMessages(mappedMessages);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // ==============================
  // SEND MESSAGE
  // ==============================
  const handleSendMessage = async (content) => {
    if (!content.trim() || !activeConversation) return;

    try {
      setSendingMessage(true);

      const newMessage = await messageService.sendMessage({
        conversationId: activeConversation.id,
        type: "text",
        content: content.trim(),
      });

      // Cập nhật tín nhắn
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, isMine: true },
      ]);

      // Cập nhật lastMessage
      setConversations((prev) =>
        prev.map((item) =>
          item.id === activeConversation.id
            ? { ...item, lastMessage: newMessage }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        loading={loadingConversations}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
      />

      {/* Main Chat Arae */}
      <main className="bg-background flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {activeConversation ? (
          <>
            <ChatHeader conversation={activeConversation} />
            <MessageList messages={messages} loading={loadingMessages} />

            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={sendingMessage}
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="text-muted-foreground text-lg font-semibold">
                Chọn một cuộc trò chuyện
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Chọn một người để bắt đầu trò chuyện
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
