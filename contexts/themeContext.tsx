import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";

type Theme = "light" | "dark";

interface ThemeColors {
  primary: string;
  secondary: string;
  button: {
    darkBlue: string;
    lightBlue: string;
    red: string;
  };
  fontFamily: string;
}

const getColors = (colorScheme: ColorSchemeName | undefined): ThemeColors => {
  return {
    primary: colorScheme === "light" ? "#DDEFEE" : "#46434d",
    secondary: colorScheme === "light" ? "black" : "#e4daf5",
    button: {
      darkBlue: colorScheme === "light" ? "#8BADAC" : "#D5A181",
      lightBlue: colorScheme === "light" ? "#5B8381" : "#A190B5",
      red: "#E3A076",
    },
    fontFamily: "Roboto",
  };
};

interface ThemeContextProps {
  theme: Theme;
  colors: ThemeColors;
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

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [colors, setColors] = useState<ThemeColors>(
    getColors(Appearance.getColorScheme())
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    console.log("THEME ÄR NU: ", theme);
  };

  useEffect(() => {
    const initialColorScheme: ColorSchemeName =
      Appearance.getColorScheme() || "dark";
    setTheme(initialColorScheme as Theme);

    const initialColors = getColors(initialColorScheme);
    setColors(initialColors);

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const updatedColors = getColors(colorScheme);
      setTheme(colorScheme as Theme);
      setColors(updatedColors);
    });

    return () => subscription.remove();
  }, []);

  const value = {
    theme,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
