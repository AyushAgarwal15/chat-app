interface I_Country {
  id: number;
  name: string;
  code: string;
  phone_code: string;
}

interface I_Sender {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at: null;
  password_updated: number;
  created_at: string;
  updated_at: string;
  device: string;
  browser: string;
  os: string;
  city: string;
  country: I_Country;
}

interface I_ChatBoxMessagesDataArrayObj {
  id: number;
  sender_id: number;
  role_id: number;
  message: string;
  unanswered: number;
  vote: null;
  chat_id: number;
  action_id: null;
  is_corrected: number;
  created_at: string;
  updated_at: string;
  sender: I_Sender;
}

interface I_ChatBoxMessagesData {
  status: string;
  status_code: number;
  message: string;
  data: I_ChatBoxMessagesDataArrayObj[];
}

interface I_ChatBoxMessages {
  data: I_ChatBoxMessagesData;
}

export type { I_ChatBoxMessages, I_ChatBoxMessagesDataArrayObj };
