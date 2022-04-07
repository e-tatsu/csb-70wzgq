import { createContext, useState } from "react";

export const DayDataContext = createContext({});

export function DayDataProvider(props) {
  const { children } = props;
  const [dayData, setDayData] = useState([]);
  return (
    <DayDataContext.Provider value={{ dayData, setDayData }}>
      {children}
    </DayDataContext.Provider>
  );
}
