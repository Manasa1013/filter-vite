import React, { createContext, ReactNode, useContext, useState } from "react";

// types
type Open = boolean;
export type ToastContextType = {
    open: Open;
    hideToast: () => void;
    showToast: () => void;
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
    const [open , setOpen] = useState(false)
    const hideToast: () => void = () => { setOpen(() => (false));  }

    const showToast: () => void = () => { setOpen(() => (true));  }
    return (
        <ToastContext.Provider value={{ open, hideToast, showToast }}>
        {children}
        </ToastContext.Provider>
    );
};
