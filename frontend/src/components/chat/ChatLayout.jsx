import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat */}
      <main className="flex min-w-0 flex-1 flex-col bg-slate-900">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </main>
    </div>
  );
}
