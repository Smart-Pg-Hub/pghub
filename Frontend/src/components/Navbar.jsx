import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/pg-logo.png";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Do not show the main Navbar for Admin
  if (isLoggedIn && user?.role === "ADMIN") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const logoPath = !isLoggedIn
    ? "/"
    : user?.role === "TENANT"
    ? "/home"
    : "/owner";

  const homePath =
    user?.role === "OWNER" || user?.role === "PG_OWNER"
      ? "/owner"
      : "/home";

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link
          to={logoPath}
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={logo}
            alt="PG Hub"
            height="40"
            className="me-2"
          />

          <span className="fs-4 text-primary">
            PG <span className="text-dark">Hub</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          {/* Left Navigation */}
          <ul className="navbar-nav me-3">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={homePath}
              >
                Home
              </Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={
                    user?.role === "OWNER" ||
                    user?.role === "PG_OWNER"
                      ? "/owner"
                      : "/tenant"
                  }
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!isLoggedIn ? (
            <div className="d-flex gap-4 ms-auto">
              <Link
                to="/login"
                className="btn btn-outline-primary d-flex align-items-center gap-2"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <FaUserPlus />
                Register
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3 ms-auto">
              <span className="fw-semibold text-dark text-nowrap">
                Welcome,{" "}
                <span className="text-primary">
                  {user?.firstName}
                </span>
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-outline-danger d-flex align-items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
