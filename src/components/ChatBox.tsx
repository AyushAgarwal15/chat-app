import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxMessageInput from "./ChatBoxMessageInput";
import ChatBoxMessages from "./ChatBoxMessages";
import { useTheme } from "./ThemeContext";

const ChatBox = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-slate-100" : "bg-dark-background"
      }`}
    >
      <ChatBoxHeader />
      <ChatBoxMessages />
      <ChatBoxMessageInput />
    </div>
  );
};

export default ChatBox;
