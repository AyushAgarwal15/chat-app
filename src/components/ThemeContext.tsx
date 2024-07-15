import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme | string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme | string>(function ():
    | Theme
    | string {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
