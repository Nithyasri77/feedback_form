import { createContext, useContext } from "react";

export const FormUIContext = createContext(null);

export const useFormUI = () => {
  const ctx = useContext(FormUIContext);
  if (!ctx) {
    throw new Error("useFormUI must be used inside FormUIContext.Provider");
  }
  return ctx;
};

