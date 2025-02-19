import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (val) => {
    setDarkMode((prev) => val ||!prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme, ThemeContext };