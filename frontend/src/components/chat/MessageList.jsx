import MessageItem from "./MessageItem";

const messages = [
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
];

export default function MessageList() {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
