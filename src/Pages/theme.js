import { createMuiTheme } from "@material-ui/core";

const useTheme = createMuiTheme({
    typography: {
      fontFamily: "'Prompt', sans-serif",
      h2: {
        fontSize: "32px",
        fontWeight: 600,
      },
    },
    palette: {
      primary: {
        main: "#138086",
      },
      secondary: {
        main: "#534666",
      },
    },
  });

export { useTheme };