import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAdminOwners } from "../../services/admin";
import AdminNavigation from "./AdminNavigation";

export default function AdminOwners() {
  const { token } = useContext(AuthContext);

  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAdminOwners(token);

      if (result.status === "success") {
        setOwners(Array.isArray(result.data) ? result.data : []);
      } else {
        setError(
          typeof result.error === "string"
            ? result.error
            : result.error?.message || "Failed to load owners",
        );
      }
    } catch (err) {
      setError(err?.message || "Failed to load owners");
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

          <div className="mt-2">Loading owners...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <AdminNavigation />

        <div className="alert alert-danger">
          <strong>Unable to load owners.</strong>

          <div className="mt-1">{error}</div>

          <button className="btn btn-sm btn-danger mt-2" onClick={load}>
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
          <h2>PG Owners & Their Properties</h2>

          <p className="text-muted mb-0">
            Every owner account alongside every property they've listed.
          </p>
        </div>

        <button className="btn btn-outline-primary" onClick={load}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Refresh
        </button>
      </div>

      {owners.length === 0 ? (
        <div className="alert alert-info">No owners yet.</div>
      ) : (
        <>
          {owners.map((owner) => {
            const properties = Array.isArray(owner.properties)
              ? owner.properties
              : [];

            const propertyCount = owner.propertyCount ?? properties.length;

            return (
              <div key={owner.ownerId} className="card shadow-sm border-0 mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <div>
                      <h5 className="mb-1">{owner.ownerName || "-"}</h5>

                      <div className="text-muted small">
                        {owner.email || "-"}
                      </div>

                      {owner.businessName && (
                        <div className="text-muted small">
                          {owner.businessName}
                        </div>
                      )}
                    </div>

                    <span className="badge bg-secondary">
                      {propertyCount}{" "}
                      {propertyCount === 1 ? "property" : "properties"}
                    </span>
                  </div>

                  {properties.length > 0 && (
                    <div className="table-responsive mt-3">
                      <table className="table table-sm mb-0">
                        <thead>
                          <tr>
                            <th>Property</th>
                            <th>Address</th>
                            <th>Rooms</th>
                            
                          </tr>
                        </thead>

                        <tbody>
                          {properties.map((p) => (
                            <tr key={p.pgId}>
                              <td>{p.name || "-"}</td>

                              <td>
                                {p.address
                                  ? `${p.address.area || ""}, ${p.address.city || ""}, ${p.address.state || ""} - ${p.address.pincode || ""}`
                                  : "-"}
                              </td>

                              <td>{p.totalRooms ?? 0}</td>

                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {properties.length === 0 && (
                    <div className="text-muted small mt-3">
                      No properties listed by this owner.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
