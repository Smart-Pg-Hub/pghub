import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icons from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

function TenantDashboard() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const navClass = ({ isActive }) =>
    `d-block text-decoration-none mb-2 p-2 rounded ${
      isActive ? "bg-white text-primary fw-bold" : "text-white"
    }`;

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: "250px" }}>
        <NavLink to="/tenant/profile" className={navClass}>
          <Icons.FaUser className="me-2" />
          Profile
        </NavLink>

        <NavLink to="/tenant/mypg" className={navClass}>
          <Icons.FaBuilding className="me-2" />
          My PG
        </NavLink>

        <NavLink to="/tenant/myroom" className={navClass}>
          <Icons.FaBed className="me-2" />
          My Room
        </NavLink>

        <NavLink to="/tenant/payments" className={navClass}>
          <Icons.FaMoneyBillWave className="me-2" />
          Payments/Rent Details
        </NavLink>

        <NavLink to="/tenant/complaints" className={navClass}>
          <Icons.FaTools className="me-2" />
          Complaints
        </NavLink>
      </div>

      {/* Page Content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default TenantDashboard;
