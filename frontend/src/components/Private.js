import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export function Private({ component }) {
  const { loggedIn } = useAuth();
  return loggedIn ? component : <Navigate to="/login" />;
}