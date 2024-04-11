import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";

interface Theme {
  bodyColor: string;
  pageBackground: string;
  primaryColor: string;
  SecondaryColor: string;
  textColor: string;
  textColorSecondary: string;
  boxShadow: string;
  name: string;
}

const LightTheme: Theme = {
  bodyColor: "#B0ACAB",
  pageBackground: "#e0e0e0",
  primaryColor: "#cfd8dc ",
  SecondaryColor: "#D9D9D9",
  textColor: "#393939",
  textColorSecondary: "#363636",
  boxShadow: "rgba(0, 0, 0, 0.3)",
  name: "light",
};

const DarkTheme: Theme = {
  bodyColor: "#393939",
  pageBackground: "#121217",
  primaryColor: "#242424",
  SecondaryColor: "#FAF9F6",
  textColor: "#E3E3E3",
  textColorSecondary: "#717171",
  boxShadow: "rgba(0, 0, 0, 0.5)",
  name: "dark",
};

const themes: Record<string, Theme> = {
  light: LightTheme,
  dark: DarkTheme,
};

const App: React.FC = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />

      <LoginPage />
    </ThemeProvider>
  );
};

export default App;
