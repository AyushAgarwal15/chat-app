interface I_SingleChatObject {
  created_at: string;
  created_by: string;
  creator: {
    browser: string;
    city: string;
    country: {
      code: string;
      id: number;
      name: string;
      phone_code: string;
    };
    created_at: string;
    device: string;
    email: string;
    email_verified_at: any;
    id: number;
    name: string;
    os: string;
    password_updated: number;
    phone: string;
    updated_at: string;
  };
  id: number;
  lead_score: number;
  msg_count: number;
  org_id: number;
  status: string;
  updated_at: string;
}

interface I_Links {
  active: boolean;
  label: string;
  url: string;
}

interface data {
  current_page: number;
  data: I_SingleChatObject[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: I_Links[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: number;
  to: number;
  total: number;
}

interface I_ChatListData {
  data: data;
  message: string;
  status: string;
  status_code: number;
}

export type { I_SingleChatObject, I_Links, I_ChatListData };
