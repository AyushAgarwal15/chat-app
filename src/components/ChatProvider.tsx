import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserDetails {
  id: number;
  name: string;
  phone: number | string;
}

interface ChatContextType {
  selectedUserDetails: UserDetails;
  isChatBoxOpen: boolean;
  setSelectedUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  setIsChatBoxOpen: (isOpen: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedUserDetails, setSelectedUserDetails] = useState<UserDetails>({
    id: 0,
    name: "",
    phone: "",
  });
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{
        selectedUserDetails,
        isChatBoxOpen,
        setSelectedUserDetails,
        setIsChatBoxOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
