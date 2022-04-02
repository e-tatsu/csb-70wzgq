import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import DateProviders from "./components/providers/DateProvider";
import { DayDataProvider } from "./components/providers/DayDataProvider";
import { PieDayOpenProvider } from "./components/providers/PieDayOpenProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DateProviders>
      <DayDataProvider>
        <PieDayOpenProvider>
          <App />
        </PieDayOpenProvider>
      </DayDataProvider>
    </DateProviders>
  </StrictMode>,
  rootElement
);
