import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import Header from "./components/Header";
import ChatList from "./components/ChatList";
import Tabs from "./components/Tabs";
import { ChatProvider, useChat } from "./components/ChatProvider";
import ChatBox from "./components/ChatBox";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("All Chats");
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { isChatBoxOpen } = useChat();
  const { theme } = useTheme();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLargeScreen = width > 1024;

  return (
    <div
      className={`bg-${theme}-primary text-${theme}-secondary min-h-screen w-full`}
    >
      {isLargeScreen ? (
        <div className="lg:flex w-full">
          <div className="lg:w-[40%]">
            <Header />
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <ChatList selectedTab={selectedTab} />
          </div>
          <div className="hidden lg:block lg:w-[60%]">
            <ChatBox />
          </div>
        </div>
      ) : !isChatBoxOpen ? (
        <>
          <Header />
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <ChatList selectedTab={selectedTab} />
        </>
      ) : (
        <div className="lg:hidden">
          <ChatBox />
        </div>
      )}
    </div>
  );
};

const Root: React.FC = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default Root;
