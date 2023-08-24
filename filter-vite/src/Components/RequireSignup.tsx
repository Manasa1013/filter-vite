import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

export interface RequireSignupProps {
  children : ReactNode
}
export const  RequireSignup : React.FC<RequireSignupProps> = ({ children }) => {
  const location = useLocation();
  const isToken = localStorage?.getItem("formObject");
  return (
    <>
      {
        isToken ? <>{children}</> : (<Navigate to="/redirect" state={{from : location}} />)
      }
    </>
  )

}