import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminNavigation() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mb-4">
      <div className="nav nav-pills gap-2">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-speedometer2 me-1"></i>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-people me-1"></i>
          Users
        </NavLink>

        <NavLink
          to="/admin/owners"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-person-badge me-1"></i>
          PG Owners
        </NavLink>

        <button
          type="button"
          className="btn btn-danger ms-auto"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-1"></i>
          Logout
        </button>

      </div>
    </div>
  );
}
