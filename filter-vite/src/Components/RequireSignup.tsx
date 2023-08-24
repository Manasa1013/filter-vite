import { Navigate, useLocation } from "react-router";

export function RequireSignup({ children  }) {
  const location = useLocation();
//   if () console.log(location);
//   return  ? (
//     <>{children}</>
//   ) : (
//     <Navigate to="/redirect" state={{ from: location }} />
//   );
}