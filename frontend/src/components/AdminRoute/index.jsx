import { Navigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

const AdminRoute = ({ children }) => {
  const { authUser, isAuthChecked } = useAuthenticateContext();

  // ⏳ Still verifying user authentication
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  // 🧩 Fix 1: Use correct property name
  // Your backend likely uses 'role' (singular), not 'roles'
  const hasAccess = authUser?.role === "admin";

  // 🧩 Fix 2: Handle case where user is null or not authorized
  if (!authUser || !hasAccess) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized admin
  return children;
};

export default AdminRoute;
