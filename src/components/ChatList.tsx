import { useEffect, useState, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { I_ChatListData, I_SingleChatObject } from "../types/chat-list-types";
import ChatItem from "./ChatItem";
import { useChat } from "./ChatProvider";
import { useTheme } from "./ThemeContext";

interface I_ChatListProps {
  selectedTab: string;
}

const TOTAL_PAGES = 10;

const ChatList = ({ selectedTab }: I_ChatListProps) => {
  const { setSelectedUserDetails, setIsChatBoxOpen } = useChat();
  const { theme } = useTheme();

  const [currentPage, setCurrentPage] = useState<number>(1); // State to track current page number
  const [chatListData, setChatListData] = useState<I_SingleChatObject[]>([]); // State to hold chat list data
  const [loadingMore, setLoadingMore] = useState<boolean>(false); // State to track loading more chats

  const { data, loading, error } = useFetch<I_ChatListData>(
    `https://devapi.beyondchats.com/api/get_all_chats?page=${currentPage}`
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.data?.data) {
      const newData =
        selectedTab === "Unread"
          ? data.data.data.filter((data) => data.msg_count > 0)
          : data.data.data;
      setChatListData((prevData) => [...prevData, ...newData]); // Append new data to existing data
      setLoadingMore(false); // Done loading more data
    }
  }, [data, selectedTab]);

  useEffect(() => {
    if (loading || !bottomBoundaryRef.current || currentPage >= TOTAL_PAGES)
      return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadingMore(true);
          setCurrentPage((prevPage) => prevPage + 1); // Load next page
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.current.observe(bottomBoundaryRef.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadingMore, loading]);

  if (loading && chatListData.length === 0)
    return (
      <p
        className={`w-full h-[85vh] flex justify-center items-center text-center pt-10 ${
          theme === "light"
            ? "bg-white text-dark-secondary"
            : "bg-dark-background text-white"
        }`}
      >
        Loading Your All Chats...
      </p>
    );

  if (error)
    return (
      <p
        className={`w-full h-[85vh] flex justify-center items-center text-center pt-10 ${
          theme === "light"
            ? "bg-white text-dark-secondary"
            : "bg-dark-background text-white"
        }`}
      >
        Error: {error}
      </p>
    );

  const handleUserClick = (
    userID: number,
    userName: string,
    userPhoneNumber: number | string
  ) => {
    setSelectedUserDetails((prev) => ({
      ...prev,
      id: userID,
      name: userName,
      phone: userPhoneNumber,
    }));
    setIsChatBoxOpen(true);
  };

  return (
    <main
      className={`${
        theme === "light" ? "bg-white" : "bg-dark-background"
      } min-h-[84vh] h-[84vh] overflow-y-scroll`}
    >
      {chatListData.map((data: I_SingleChatObject) => (
        <ChatItem
          key={data.id}
          data={data}
          id={data.id}
          onHandleUserClick={handleUserClick}
        />
      ))}
      <div ref={bottomBoundaryRef} className="text-center pt-4">
        {loadingMore && <p>Loading more chats...</p>}
      </div>
    </main>
  );
};

export default ChatList;
