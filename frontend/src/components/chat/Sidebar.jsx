import { Search, LogOut, MessageSquare, Settings, User } from "lucide-react";
import avatar from "../../assets/image/Avatar.jpg";

import { getMyConversations } from "../../api/conversation.api";

// Mock data
const conversations = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/100?img=1",
    lastMessage: "Hôm nay thế nào?",
    time: "10:30",
  },
  {
    id: 2,
    name: "Trần Văn B",
    avatar: "https://i.pravatar.cc/100?img=2",
    lastMessage: "Ok 👍",
    time: "09:15",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/100?img=3",
    lastMessage: "Tối nay chơi không?",
    time: "08:42",
  },
];

export default function Sidebar({ onSelectConversation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await getMyConversations();
        console.log("CONVERSATIONS:", response.data);

        setConversations(response.data.data);
      } catch (error) {
        console.error("Failed to load conversations:", error);
      } finally {
        setloading(false);
      }
    };

    loadConversations();
  }, []);
  return (
    <div className="flex w-80 flex-col border-r border-slate-800 bg-slate-900 text-slate-100">
      {/*Current User */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-950/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="h-12 w-12 rounded-full border border-slate-700"
            />
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Hoang</h3>
            <p className="text-xs text-slate-400">online</p>
          </div>
        </div>
        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-rose-400">
          <LogOut size={18} />
        </button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search
            className="absolute top-2.5 left-3 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="w-full rounded-xl bg-slate-800 py-2 pr-4 pl-10 text-sm text-slate-200 transition-all placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Conversation */}
      <div className="flex-1 space-y-1 overflow-y-auto px-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className="flex cursor-pointer items-center space-x-3 rounded-xl p-3 text-white hover:bg-slate-800"
          >
            <div className="relative">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="h-11 w-11 rounded-full"
              />
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-emerald-500"></span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-baseline justify-between">
                <h4 className="truncate text-sm font-medium">
                  {conversation.name}
                </h4>
                <span className="text-[10px] text-indigo-200">
                  {conversation.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="truncate text-xs text-indigo-100">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Footer Thanh điều hướng */}
      <div className="flex justify-around border-t border-slate-800 bg-slate-950/30 p-3">
        <button className="rounded-lg p-2 text-indigo-400 hover:bg-slate-800">
          <MessageSquare size={20} />
        </button>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200">
          <User size={20} />
        </button>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}
