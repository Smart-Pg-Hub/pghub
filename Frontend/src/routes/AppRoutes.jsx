import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import OwnerRoute from "./OwnerRoute";
import TenantRoute from "./TenantRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PgDetails from "../pages/PgDetails";

import Booking from "../pages/booking/Booking";
import BookingSuccess from "../pages/booking/BookingSuccess";

import OwnerDashboard from "../pages/OwnerDashboard";

import TenantDashboard from "../pages/tenant/TenantDashboard";
import MyPg from "../pages/tenant/MyPg";
import MyRoom from "../pages/tenant/MyRoom";
import Payments from "../pages/tenant/Payments";
import Complaints from "../pages/tenant/Complaints";
import Profile from "../pages/tenant/Profile";

import PropertyDetails from "../pages/property/PropertyDetails";
import ManageProperty from "../pages/property/ManageProperty";

import RoomManagement from "../pages/rooms/RoomManagement";
import TenantManagement from "../components/property/TenantManagement";
import RentManagement from "../components/property/RentManagement";
import PropertyReviews from "../components/reviews/PropertyReviews";
import ComplaintManagement from "../components/property/ComplaintManagement";

import Landing from "../pages/landing/Landing";
import Home from "../pages/Home";
import PropertyList from "../pages/property/PropertyList";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminOwners from "../pages/admin/AdminOwners";
import AdminRoute from "./Admin";

function RootRedirect() {
  const { user } = useContext(AuthContext);

  if (user?.role === "TENANT") {
    return <Navigate to="/tenant" replace />;
  }

  if (user?.role === "OWNER") {
    return <Navigate to="/owner" replace />;
  }

  if (user?.role === "PG_OWNER") {
    return <Navigate to="/owner" replace />;
  }

  if (user?.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Root */}
        <Route path="/" element={<Landing />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pg-details/:id" element={<PgDetails />} />
        <Route path="/properties" element={<PropertyList />} />

        {/* TENANT only */}
        <Route
          path="/tenant"
          element={
            <TenantRoute>
              <TenantDashboard />
            </TenantRoute>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />

          <Route path="profile" element={<Profile />} />

          <Route path="mypg" element={<MyPg />} />

          <Route path="myroom" element={<MyRoom />} />

          <Route path="payments" element={<Payments />} />

          <Route path="complaints" element={<Complaints />} />
        </Route>

        {/* OWNER only */}
        <Route
          path="/owner"
          element={
            <OwnerRoute>
              <OwnerDashboard />
            </OwnerRoute>
          }
        />

        <Route
          path="/manageproperty/:id"
          element={
            <OwnerRoute>
              <ManageProperty />
            </OwnerRoute>
          }
        >
          <Route path="room-management" element={<RoomManagement />} />

          <Route path="tenants" element={<TenantManagement />} />

          <Route path="rent-management" element={<RentManagement />} />

          <Route path="reviews" element={<PropertyReviews />} />

          <Route path="complaints" element={<ComplaintManagement />} />
        </Route>

        {/* ADMIN only */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/owners"
          element={
            <AdminRoute>
              <AdminOwners />
            </AdminRoute>
          }
        />

        {/* Shared: authenticated users */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookingsuccess"
          element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/property/details/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<RootRedirect />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
