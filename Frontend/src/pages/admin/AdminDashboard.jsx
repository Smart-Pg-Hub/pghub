
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAdminDashboard } from "../../services/admin";
import AdminNavigation from './AdminNavigation'

function StatCard({ label, value, icon, variant = "primary" }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div
          className={`text-${variant}`}
          style={{ fontSize: "1.75rem" }}
        >
          <i className={`bi ${icon}`}></i>
        </div>

        <div className="text-muted mt-2">
          {label}
        </div>

        <div className={`fw-bold text-${variant} fs-4`}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getAdminDashboard(token);

        if (result.status === "success") {
          setStats(result.data);
        } else {
          setError(
            typeof result.error === "string"
              ? result.error
              : result.error?.message ||
                  "Failed to load admin dashboard"
          );
        }
      } catch (err) {
        setError(
          err?.message || "Failed to load admin dashboard"
        );
      }

      setLoading(false);
    };

    if (token) {
      loadDashboard();
    } else {
      setLoading(false);
      setError("Authentication token not found");
    }
  }, [token]);

  if (loading) {
    return (
      <div className="container mt-4">
        <AdminNavigation />

        <div className="text-center mt-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <div className="mt-2">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <AdminNavigation />

        <div className="alert alert-danger">
          <strong>
            Unable to load dashboard.
          </strong>

          <div className="mt-1">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mt-4">
        <AdminNavigation />

        <div className="alert alert-warning">
          No dashboard data available.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <AdminNavigation />

      <h2 className="mb-4">
        Admin Dashboard
      </h2>

      {/* People */}
      <h5 className="text-muted mb-3">
        People
      </h5>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <StatCard
            label="Tenants"
            value={stats.totalTenants ?? 0}
            icon="bi-people-fill"
          />
        </div>

        <div className="col-md-6">
          <StatCard
            label="PG Owners"
            value={stats.totalOwners ?? 0}
            icon="bi-person-badge-fill"
            variant="success"
          />
        </div>
      </div>

      {/* Properties */}
      <h5 className="text-muted mb-3">
        Properties
      </h5>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <StatCard
            label="Properties Listed"
            value={stats.totalProperties ?? 0}
            icon="bi-building"
          />
        </div>

        <div className="col-md-6">
          <StatCard
            label="Rooms"
            value={stats.totalRooms ?? 0}
            icon="bi-door-open-fill"
          />
        </div>
      </div>

      {/* Bookings */}
      <h5 className="text-muted mb-3">
        Bookings
      </h5>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <StatCard
            label="Total Bookings"
            value={stats.totalBookings ?? 0}
            icon="bi-journal-check"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            label="Pending"
            value={stats.pendingBookings ?? 0}
            icon="bi-hourglass-split"
            variant="warning"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            label="Confirmed"
            value={stats.confirmedBookings ?? 0}
            icon="bi-check-circle-fill"
            variant="success"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            label="Cancelled"
            value={stats.cancelledBookings ?? 0}
            icon="bi-x-circle-fill"
            variant="secondary"
          />
        </div>
      </div>

      {/* Revenue */}
      <h5 className="text-muted mb-3">
        Revenue
      </h5>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <StatCard
            label="Paid"
            value={`₹${stats.paidRevenue ?? 0}`}
            icon="bi-cash-coin"
            variant="success"
          />
        </div>

        <div className="col-md-6">
          <StatCard
            label="Pending"
            value={`₹${stats.pendingRevenue ?? 0}`}
            icon="bi-hourglass-split"
            variant="warning"
          />
        </div>
      </div>

      {/* Support & Feedback */}
      <h5 className="text-muted mb-3">
        Support & Feedback
      </h5>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <StatCard
            label="Open Complaints"
            value={stats.openComplaints ?? 0}
            icon="bi-flag-fill"
            variant="warning"
          />
        </div>

        <div className="col-md-4">
          <StatCard
            label="Resolved Complaints"
            value={stats.resolvedComplaints ?? 0}
            icon="bi-flag"
            variant="success"
          />
        </div>

        <div className="col-md-4">
          <StatCard
            label="Total Reviews"
            value={stats.totalReviews ?? 0}
            icon="bi-star-fill"
            variant="warning"
          />
        </div>
      </div>
    </div>
  );
}