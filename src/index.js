import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App msg={"Welcome to React & Xstate"} />
  </StrictMode>,
  rootElement
);
