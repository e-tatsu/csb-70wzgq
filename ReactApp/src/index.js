import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import DateProviders from "./components/providers/DateProvider";
import { DayDataProvider } from "./components/providers/DayDataProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DateProviders>
      <DayDataProvider>
        <App />
      </DayDataProvider>
    </DateProviders>
  </StrictMode>,
  rootElement
);
