import React, { createContext, ReactNode, useContext, useState } from "react";

// types
type Toast = "open" | "close";
export type ToastContextType = {
  toast: Toast;
  toggleToast: () => void;
};
export type ToastProviderProps = {
  children: ReactNode;
};

// Toast context
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("There is no ToastContext");
  return context;
};

//provider
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<Toast>("close");
  const toggleToast = () => {
    setToast((prev) => (prev === "close" ? "open" : "close"));
  };
  return (
    <ToastContext.Provider value={{ toast, toggleToast }}>
      {children}
    </ToastContext.Provider>
  );
};
