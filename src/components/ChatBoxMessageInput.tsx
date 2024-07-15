import { IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import { useTheme } from "./ThemeContext";
import { useChat } from "./ChatProvider";

const ChatBoxMessageInput = () => {
  const { theme } = useTheme();
  const { selectedUserDetails } = useChat();

  return (
    <>
      {selectedUserDetails.id !== 0 && (
        <div
          className={`shadow-xl z-10 ${
            theme === "light"
              ? "bg-white text-black"
              : "bg-dark-secondary text-white"
          } flex items-center p-2 rounded-b-lg`}
        >
          <IconButton className="p-2">
            <EmojiEmotionsIcon className="text-gray-400" />
          </IconButton>

          <input
            name="message"
            placeholder="Write a message..."
            className={`${
              theme === "light"
                ? "bg-white text-black"
                : "bg-dark-secondary text-white"
            } flex-grow p-2 mx-2 rounded-lg focus:outline-none `}
          />
          <IconButton className="p-2">
            <AttachFileIcon className="text-gray-400" />
          </IconButton>
          <IconButton className="p-2">
            <MicIcon className="text-gray-400" />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default ChatBoxMessageInput;
