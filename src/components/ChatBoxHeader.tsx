import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "./ThemeContext";
import { useChat } from "./ChatProvider";

const ChatBoxHeader = () => {
  const { selectedUserDetails, setIsChatBoxOpen } = useChat();
  const { theme } = useTheme();

  return (
    <>
      {selectedUserDetails.id === 0 ? (
        <div className="flex justify-center w-full min-h-16 pt-4">
          <h1 className={`font-semibold text-xl text-white`}>
            No User Selected
          </h1>
        </div>
      ) : (
        <div
          className={`flex justify-between px-4 items-center text-white min-h-16 ${
            theme === "light" ? "bg-light-secondary" : "bg-dark-secondary"
          }`}
        >
          <div onClick={() => setIsChatBoxOpen(false)} className="lg:hidden">
            <ArrowBackIcon className={`cursor-pointer`} />
          </div>
          <div className="flex gap-4 w-[60%]">
            {" "}
            <img
              src={`https://i.pravatar.cc/48?u=${selectedUserDetails.id}`}
              alt={selectedUserDetails.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className={`font-semibold text-xl text-white`}>
                {selectedUserDetails.name}
              </h1>
              <p className="text-sm text-gray-300">last seen recently</p>
            </div>
          </div>
          <div className="flex gap-6 item-center">
            {" "}
            <CallIcon className="text-white cursor-pointer" />
            <MoreVertIcon className="text-white cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBoxHeader;
