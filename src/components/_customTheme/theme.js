import { createTheme, ThemeProvider } from "@material-ui/core/styles";


const customTheme = createTheme({
    typography: {
      fontFamily: [
        "Blinker",
        "Arial",
        "sans-serif"
      ].join(",")
    },
    palette: {
      primary: '#667b68',
    },
  });


  export default customTheme