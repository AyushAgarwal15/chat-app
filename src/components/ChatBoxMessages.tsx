import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import {
  I_ChatBoxMessages,
  I_ChatBoxMessagesDataArrayObj,
} from "../types/chat-box-messages-types";
import { useChat } from "./ChatProvider";
import { useTheme } from "./ThemeContext";
import classNames from "classnames";

const ChatBoxMessages = () => {
  const { theme } = useTheme();
  const { selectedUserDetails } = useChat();

  const { data, loading } = useFetch<I_ChatBoxMessages>(
    `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${selectedUserDetails.id}`
  );

  const [groupedMessages, setGroupedMessages] = useState<any[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<
    I_ChatBoxMessagesDataArrayObj[]
  >([]);
  const [unreadMessagesMarkAsRead, setUnreadMessagesMarkAsRead] =
    useState<boolean>(false);
  const [currentVisibleDate, setCurrentVisibleDate] = useState<string | null>(
    ""
  );

  const dateRefs = useRef<{ [key: string]: any }>({});

  const markAsRead = () => {
    setUnreadMessagesMarkAsRead(true);
  };

  useEffect(() => {
    if (data?.data) {
      // Filter unread messages
      const unread = data?.data?.filter(
        (message: any) => message.unanswered === 1
      );

      // Group messages by date
      const grouped = data.data?.reduce(
        (acc: any, message: I_ChatBoxMessagesDataArrayObj) => {
          const date = new Date(message.created_at);
          const dateString = `${date.toLocaleString("default", {
            month: "long",
          })} ${date.getDate()}`;
          if (!acc[dateString]) {
            acc[dateString] = [];
          }
          acc[dateString].push(message);
          return acc;
        },
        {}
      );

      // Convert object to array for easier rendering
      const groupedArray = Object.keys(grouped).map((date) => ({
        date,
        messages: grouped[date],
      }));

      setGroupedMessages(groupedArray);
      setUnreadMessages(unread);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentVisibleDate(entry.target.getAttribute("data-date"));
          }
        });
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    Object.values(dateRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(dateRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [groupedMessages]);

  if (loading)
    return (
      <p
        className={`${
          theme === "light" ? "text-black" : "text-white"
        } min-h-[80vh] flex justify-center items-center w-full`}
      >
        Loading Messages...
      </p>
    );

  if (selectedUserDetails.id === 0) {
    return (
      <p
        className={`${
          theme === "light"
            ? "bg-light-background text-black"
            : "bg-dark-background text-white"
        } min-h-[80vh] flex justify-center items-center w-full`}
      >
        Select a user to start the conversation.
      </p>
    );
  }

  return (
    <div className="relative min-h-[81vh] h-[81vh] overflow-y-scroll overflow-x-hidden px-4 py-2">
      <div className={classNames("sticky top-0 z-10")}>
        <div className="text-center">
          <span
            className={`${
              theme === "dark" ? "bg-dark-secondary" : "bg-light-background"
            }  px-4 py-1 font-bold text-white text-sm rounded-xl opacity-75`}
          >
            {currentVisibleDate}
          </span>
        </div>
      </div>

      <div>
        {groupedMessages.map(({ date, messages }, index) => (
          <div key={index}>
            <div
              className="text-center my-2"
              ref={(el) => (dateRefs.current[date] = el)}
              data-date={date}
            >
              {/* <span className="bg-gray-700 px-4 py-1 font-semibold text-white text-sm rounded-xl">
                {date}
              </span> */}
            </div>
            {messages.map(
              (message: I_ChatBoxMessagesDataArrayObj, index: number) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    (index + 1) % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`max-w-sm shadow-xl rounded-xl p-2 m-2 ${
                      (index + 1) % 2 === 0
                        ? `bg-blue-500 text-white`
                        : `${
                            theme === "dark"
                              ? "bg-dark-secondary text-white"
                              : "bg-white text-black"
                          }`
                    }`}
                  >
                    {message.message}
                  </p>
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {unreadMessages.length > 0 && (
        <div className="p-4 text-center w-full">
          <p
            className={`${unreadMessagesMarkAsRead ? "hidden" : ""} ${
              theme === "light" ? "bg-light-background" : "bg-dark-secondary"
            } font-bold text-gray-100 cursor-pointer w-full py-1`}
            onClick={markAsRead}
          >
            {unreadMessages.length} Unread Messages
          </p>
          {unreadMessages.map((message, index) => (
            <div key={index} className="flex justify-start items-center">
              <p
                className={`max-w-sm shadow-xl rounded-xl p-2 m-2 ${
                  theme === "dark"
                    ? "bg-dark-secondary text-white"
                    : "bg-white text-black"
                }`}
              >
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBoxMessages;
