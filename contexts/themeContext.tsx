// ThemeContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeColors {
  primary: string;
  secondary: string;
  button: {
    darkBlue: string;
    lightBlue: string;
    red: string;
  };
}

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme();
  const defaultTheme: Theme = systemTheme === "dark" ? "dark" : "light";
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const colors: ThemeColors = {
    primary: theme === "light" ? "#ffffff" : "#2C3E50",
    secondary: theme === "light" ? "#2C3E50" : "#ffffff",
    button: {
      darkBlue: "#34495E",
      lightBlue: "#3498DB",
      red: "#E74C3C",
    },
  };

  const value = {
    theme,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
