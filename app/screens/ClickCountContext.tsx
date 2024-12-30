// ClickCountContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface ClickCountContextType {
  clickCount: number;
  incrementClickCount: () => void;
}

// Create a context for managing click count with an initial value
const ClickCountContext = createContext<ClickCountContextType | undefined>(undefined);

// Provider component to wrap the app and provide context value
export const ClickCountProvider = ({ children }: { children: ReactNode }) => {
  const [clickCount, setClickCount] = useState<number>(0);

  // Function to increment the click count
  const incrementClickCount = () => setClickCount(clickCount + 1);

  return (
    <ClickCountContext.Provider value={{ clickCount, incrementClickCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};

// Custom hook to use the click count context
export const useClickCount = (): ClickCountContextType => {
  const context = useContext(ClickCountContext);
  if (!context) {
    throw new Error("useClickCount must be used within a ClickCountProvider");
  }
  return context;
};
