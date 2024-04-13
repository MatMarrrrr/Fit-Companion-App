import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";

interface Theme {
  bodyColor: string;
  pageBackground: string;
  primaryColor: string;
  SecondaryColor: string;
  textColorPrimary: string;
  textColorSecondary: string;
  boxShadow: string;
  name: string;
}

const LightTheme: Theme = {
  bodyColor: "#FAFAFA",
  pageBackground: "#e0e0e0",
  primaryColor: "#D9D9D9 ",
  SecondaryColor: "#424242",
  textColorPrimary: "#424242",
  textColorSecondary: "#FAFAFA",
  boxShadow: "rgba(0, 0, 0, 0.3)",
  name: "light",
};

const DarkTheme: Theme = {
  bodyColor: "#424242",
  pageBackground: "#121217",
  primaryColor: "#212121",
  SecondaryColor: "#F5F5F5",
  textColorPrimary: "#EEEEEE",
  textColorSecondary: "#424242",
  boxShadow: "rgba(0, 0, 0, 0.5)",
  name: "dark",
};

const themes: Record<string, Theme> = {
  light: LightTheme,
  dark: DarkTheme,
};

const App: React.FC = () => {
  const [theme] = useState("dark");

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />

      <LoginPage />
    </ThemeProvider>
  );
};

export default App;
