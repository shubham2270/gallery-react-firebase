import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "./index.css";
import App from "./App";

const colors = {
  g: "#06D6A0",
  y: "#FFD166",
  r: "#EF476F",
  b: "#118AB2",
  dark: "#073B4C",
};

const theme = extendTheme({ colors });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
