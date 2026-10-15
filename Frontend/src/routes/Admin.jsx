import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    if (user?.role === "TENANT") {
      return <Navigate to="/tenant" replace />;
    }

    if (user?.role === "OWNER") {
      return <Navigate to="/owner" replace />;
    }

    if (user?.role === "PG_OWNER") {
      return <Navigate to="/owner" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
