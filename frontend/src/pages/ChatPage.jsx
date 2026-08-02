import Sidebar from "../components/chat/Sidebar/Sidebar";
import ChatArea from "../components/chat/Chat/ChatArea";

export default function ChatPage() {
  return (
    <div className="flex">
      <Sidebar />
      <ChatArea />
    </div>
  );
}
