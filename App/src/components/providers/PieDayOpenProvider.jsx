import { createContext, useState } from "react";

export const PieDayOpenContext = createContext({});

export function PieDayOpenProvider(props) {
  const { children } = props;
  const [pieDayOpen, setPieDayOpen] = useState(true);
  return (
    <PieDayOpenContext.Provider value={{ pieDayOpen, setPieDayOpen }}>
      {children}
    </PieDayOpenContext.Provider>
  );
}
