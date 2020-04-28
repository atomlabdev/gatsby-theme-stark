import React, { useEffect } from "react";
import { configure, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ThemeProvider, useColorMode } from "theme-ui";
import { useDarkMode } from "storybook-dark-mode";
import theme from "../src/gatsby-plugin-theme-ui/index";

const ColorModeWrapper = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode();
  const darkMode = useDarkMode();

  useEffect(() => {
    setColorMode(darkMode ? "dark" : "default");
  }, [darkMode]);

  return <>{children}</>;
};

addDecorator((storyFn) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeWrapper>
        <div style={{ padding: 20 }}>{storyFn()}</div>
      </ColorModeWrapper>
    </ThemeProvider>
  );
});

// automatically import all files ending in *.stories.tsx
configure(require.context("../src", true, /\.stories\.tsx$/), module);
// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = "";
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname);
};
