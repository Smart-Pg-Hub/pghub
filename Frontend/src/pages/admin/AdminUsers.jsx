import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAllAdminUsers } from "../../services/admin";
import AdminNavigation from './AdminNavigation'

const roleVariant = {
  TENANT: "primary",
  OWNER: "success",
  PG_OWNER: "success",
  ADMIN: "danger",
};

export default function AdminUsers() {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAllAdminUsers(token);

      if (result.status === "success") {
        setUsers(Array.isArray(result.data) ? result.data : []);
      } else {
        setError(
          typeof result.error === "string"
            ? result.error
            : result.error?.message || "Failed to load users"
        );
      }
    } catch (err) {
      setError(err?.message || "Failed to load users");
    }

    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (token) {
      load();
    } else {
      setLoading(false);
      setError("Authentication token not found");
    }
  }, [token, load]);

  if (loading) {
    return (
      <div className="container mt-4">
        <AdminNavigation />

        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <div className="mt-2">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <AdminNavigation />

        <div className="alert alert-danger">
          <strong>Unable to load users.</strong>

          <div className="mt-1">{error}</div>

          <button
            className="btn btn-sm btn-danger mt-2"
            onClick={load}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <AdminNavigation />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>All Users</h2>

          <p className="text-muted mb-0">
            Every tenant and PG owner account, with a quick activity count
            for each.
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={load}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Refresh
        </button>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info">
          No users yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white shadow-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Activity</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.userId}>
                  <td>
                    {u.firstName || ""} {u.lastName || ""}
                  </td>

                  <td>{u.email || "-"}</td>

                  <td>{u.phone || "-"}</td>

                  <td>
                    <span
                      className={`badge bg-${
                        roleVariant[u.role] || "secondary"
                      }`}
                    >
                      {u.role || "UNKNOWN"}
                    </span>
                  </td>

                  <td>{u.createdOn || "-"}</td>

                  <td>
                    {u.role === "TENANT"
                      ? `${u.activityCount ?? 0} booking${
                          (u.activityCount ?? 0) === 1 ? "" : "s"
                        }`
                      : `${u.activityCount ?? 0} propert${
                          (u.activityCount ?? 0) === 1 ? "y" : "ies"
                        }`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
