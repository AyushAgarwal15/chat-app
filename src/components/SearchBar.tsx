import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "./ThemeContext";

interface I_SearchBarProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<I_SearchBarProps> = ({
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="lg:hidden text-white"
        >
          <ArrowBackIcon className={`cursor-pointer`} />
        </div>
      )}

      <div
        className={`relative ${
          isSearchOpen ? "block" : "hidden"
        } md:block pt-2 w-full`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className={`border border-${theme}-secondary rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 bg-${theme}-background text-white`}
        />
      </div>
      {!isSearchOpen && (
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={`md:hidden p-2 ml-2 rounded-full max-w-sm`}
        >
          <SearchIcon className={`text-white font-bold`} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
