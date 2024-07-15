import CustomTab from "./CustomTab";
import { useTheme } from "./ThemeContext";

const tabs = [
  { label: "All Chats", value: "All Chats" },
  { label: "Personal", value: "Personal" },
  { label: "Unread", value: "Unread" },
];

interface I_TabsProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = ({ selectedTab, setSelectedTab }: I_TabsProps) => {
  const { theme } = useTheme();

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div
      className={`sticky top-0 z-10 pt-2 ${
        theme === "light" ? "bg-light-background" : "bg-dark-secondary"
      }`}
    >
      <div className="flex w-full justify-between px-4">
        {tabs.map((tab) => (
          <CustomTab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            selectedTab={selectedTab}
            onClick={() => handleTabChange(tab.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Tabs;
