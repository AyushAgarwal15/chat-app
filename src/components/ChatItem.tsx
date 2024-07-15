import { I_SingleChatObject } from "../types/chat-list-types";
import { useChat } from "./ChatProvider";
import { useTheme } from "./ThemeContext";

interface I_CharItemProps {
  id: number;
  data: I_SingleChatObject;
  onHandleUserClick: (
    userID: number,
    userName: string,
    userPhoneNumber: number | string
  ) => void;
}

const ChatItem = ({ id, data, onHandleUserClick }: I_CharItemProps) => {
  const { selectedUserDetails } = useChat();
  const { theme } = useTheme();

  return (
    <div
      className={`flex gap-6 px-4 py-2 cursor-pointer ${
        theme === "light"
          ? "hover:bg-gray-200 hover:bg-opacity-50"
          : "hover:bg-gray-700 hover:bg-opacity-50 text-white"
      }  ${
        selectedUserDetails.id === id
          ? theme === "light"
            ? "bg-light-background text-white hover:bg-light-background"
            : "bg-gray-700 text-white hover:bg-dark-background"
          : ""
      } bg-opacity-50 w-full`}
      onClick={() =>
        onHandleUserClick(
          id,
          data.creator.name || "Unknow User",
          data.creator.phone
        )
      }
    >
      <img
        src={`https://i.pravatar.cc/48?u=${id}`}
        alt={data.creator.name}
        className="w-14 h-14 rounded-full"
      />
      <div className="w-full">
        <div className="min-h-14">
          <h1
            className={`font-semibold ${
              selectedUserDetails.id === id ? "text-white" : ""
            } `}
          >
            {data.creator.name || "Unknown User"}
          </h1>
          <p
            className={`${
              selectedUserDetails.id === id ? "text-white" : "text-gray-400"
            } pb-2 `}
          >
            last message
          </p>
        </div>
        <hr
          className={`text-gray-900 ${
            theme === "dark" ? "opacity-25" : ""
          } mt-2`}
        />
      </div>
    </div>
  );
};

export default ChatItem;
