import { useState, useEffect } from "react";

import ConversationSidebar from "./ConversationSidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useAuth from "../../hook/useAuth";

import * as conversationService from "../../services/conversation.service";
import * as messageService from "../../services/message.service";

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

      console.log(data);

      const mappedMessages = data.map((message) => ({
        ...message,
        isMine: message.senderId === user.id,
      }));

      setMessages(mappedMessages);
    } catch (error) {
      console.error(error);

      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // ==============================
  // SEND MESSAGE
  // ==============================
  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    if (!activeConversation) return;

    try {
      setSendingMessage(true);

      const newMessage = await messageService.sendMessage({
        conversationId: activeConversation.id,
        type: "text",
        content: content.trim(),
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, isMine: true },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setSendingMessage(false);
      setMessageInput("");
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

      {/* Chat */}
      <main className="bg-background flex min-w-0 flex-1 flex-col">
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
