import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import PlayerLayout from "components/PlayerLayout";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#f5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

const App = ({ Component, pageProps }) => {
  return (
    // If page has authPage property do not wrapp it in PlayerLayout
    <ChakraProvider theme={theme}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        // If page doesn`t have authPage property it should have PlayerLayout in the dashboard.
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </ChakraProvider>
  );
};

export default App;
