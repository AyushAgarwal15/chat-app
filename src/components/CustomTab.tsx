import { useTheme } from "./ThemeContext";

interface CustomTabProps {
  label: string;
  value: string;
  selectedTab: string;
  onClick: () => void;
}

const CustomTab: React.FC<CustomTabProps> = ({
  label,
  value,
  selectedTab,
  onClick,
}) => {
  const { theme } = useTheme();

  let selectedTabTextColor;

  if (selectedTab === value) {
    selectedTabTextColor =
      theme === "light" ? "text-white" : "text-light-background";
  } else {
    selectedTabTextColor = "text-gray-300";
  }

  return (
    <div
      className={`cursor-pointer px-4 font-semibold ${
        theme === "light" ? "hover:text-white" : "hover:text-light-background"
      }  ${selectedTabTextColor}`}
      onClick={onClick}
    >
      {label}
      {selectedTab === value && (
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-light-background"
          } h-1 w-full rounded-lg mt-1`}
        ></div>
      )}
    </div>
  );
};

export default CustomTab;
