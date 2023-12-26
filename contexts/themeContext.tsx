import React, {
  createContext,
  useContext,
  ReactNode,
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
}

const getColors = (colorScheme: ColorSchemeName | undefined): ThemeColors => {
  return {
    primary: colorScheme === "light" ? "#FFFFFF" : "#212121",
    secondary: colorScheme === "light" ? "#424242" : "#FFFFFF",
    button: {
      darkBlue: colorScheme === "light" ? "#364E65" : "#708AA2",
      lightBlue: colorScheme === "light" ? "#BACFE2" : "#7F98B0",
      red: "#E74C3C",
    },
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
  };

  useEffect(() => {
    const initialColorScheme: ColorSchemeName =
      Appearance.getColorScheme() || "dark";
    setTheme(initialColorScheme as Theme);
    setColors(getColors(initialColorScheme));

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
