import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
export const PrivateRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  return user ? children : <Navigate to="/" />;
};
