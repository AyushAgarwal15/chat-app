import { useState } from "react";
import {
  NightsStay as ModeNightIcon,
  WbSunny as WbSunnyIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTheme } from "./ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [animating, setAnimating] = useState(false);

  const toggleThemeHandler = () => {
    setAnimating(true);
    setTimeout(() => {
      toggleTheme();
      setAnimating(false);
    }, 300);
  };

  return (
    <Button
      onClick={toggleThemeHandler}
      className="fixed bottom-0 right-0 m-4 p-2 bg-gray-800 rounded-full"
    >
      {animating ? (
        theme === "light" ? (
          <ModeNightIcon className="text-white icon-exit" />
        ) : (
          <WbSunnyIcon className="text-white icon-exit" />
        )
      ) : theme === "light" ? (
        <WbSunnyIcon className="text-white icon-enter" />
      ) : (
        <ModeNightIcon className="text-white icon-enter" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;
