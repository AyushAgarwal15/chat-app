import { useState } from "react";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import { useTheme } from "./ThemeContext";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header
      className={`flex flex-col pb-4 px-2 w-full ${
        theme === "light" ? "bg-light-background" : "bg-dark-secondary"
      }`}
    >
      <div className="flex justify-between w-full">
        {!isSearchOpen && (
          <div className="flex items-center gap-4">
            <Nav />
            <h1 className={`font-semibold text-xl text-white lg:hidden`}>
              Telegram
            </h1>
          </div>
        )}
        <div className={`${isSearchOpen ? "w-full" : ""} lg:w-full px-2`}>
          <SearchBar
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
