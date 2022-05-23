import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { red } from "@mui/material/colors";

const primaryColor = "#667b68";
const secondaryColor = "#a3b899";
const dangerColor = red[900];


const customTheme = createTheme({
    typography: {
      fontFamily: [
        "Blinker",
        "Arial",
        "sans-serif", 
      ].join(",")
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      danger: {
        main: dangerColor,
      },
    },
    components: {
      MuiFab: {
        styleOverrides: {
          primary: {
            backgroundColor: primaryColor,
          },
        },
      },
    }
  });

  // MuiTypography-root 
  // MuiTypography-h5 
  // css-ag7rrr-MuiTypography-root


  export default customTheme