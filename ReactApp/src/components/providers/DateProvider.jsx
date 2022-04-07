import { createContext, useState } from "react";

export const DateContext = createContext({});

export default function DateProviders(props) {
  const { children } = props;
  const [targetValue, setTargetValue] = useState(new Date());
  return (
    <DateContext.Provider value={{ targetValue, setTargetValue }}>
      {children}
    </DateContext.Provider>
  );
}
