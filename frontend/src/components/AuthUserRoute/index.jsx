import { Navigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

const AuthUserRoute = ({ children }) => {
  const { authUser, isAuthChecked } = useAuthenticateContext();

  // ⏳ Wait for authentication check to complete
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  // 🧩 Fix 1: The field should be 'role', not 'roles'
  const hasAccess = authUser?.role === "user";

  // 🧩 Fix 2: Handle unauthorized or missing user
  if (!authUser || !hasAccess) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized user route
  return children;
};

export default AuthUserRoute;
