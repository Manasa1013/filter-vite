import React, { createContext, ReactNode, useContext, useState } from "react";

// interface for form elements

export interface UserObject {
    username: string,
    email : string,
    phoneNumber : string
}
export interface FormElements {
    userObject : UserObject
}
export interface FormContextInterface  {
    formObject: UserObject,
    saveFormObject: (arg0 : UserObject) => void,
    getFormObjectFromLocalStorage : () => UserObject | string,
    saveFormObjectToLocalStorage: () => void,
    resetFormValues : () => void
};
export type FormProviderProps = {
  children: ReactNode;
};

// Form context
export const FormContext = createContext<FormContextInterface | undefined>(
  undefined
);
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("There is no FormContext");
  return context;
};

//provider
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    
    const [formObject, setFormObject] = useState<UserObject>({
        username: "",
        email: "",
        phoneNumber : ""
    })
    
    const saveFormObject = (form : UserObject) => {
    setFormObject(() => form);
}
    const getFormObjectFromLocalStorage : () => UserObject | string = () => {
        // TODO : remove log statements
        console.log(localStorage?.getItem("formObject"));
        return JSON.parse(localStorage?.getItem("formObject") || "");
    }
    const saveFormObjectToLocalStorage : () => void = () => {
        const objectToBeSavedToLS = { ...formObject };
        localStorage.setItem("formObject", JSON.stringify(objectToBeSavedToLS));
        
    }
    const resetFormValues: () => void = () => {
        setFormObject((prev) => ({...prev , username : "" , email : "" , phoneNumber : "" }))
    }
    
    return (
        <FormContext.Provider value={{formObject,saveFormObject, getFormObjectFromLocalStorage,saveFormObjectToLocalStorage, resetFormValues  }}>
        {children}
        </FormContext.Provider>
    );
};
