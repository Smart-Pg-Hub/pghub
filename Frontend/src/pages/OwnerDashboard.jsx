import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPropertiesByOwnerId } from "../services/property";
import AddProperty from "./../components/property/AddProperty";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const ownerId = user.id;

  const [properties, setProperties] = useState([]);

  const loadProperties = async () => {
    const result = await getPropertiesByOwnerId(ownerId, token);

    if (result.status === "success") {
      setProperties(result.data);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div className="container py-5">
      {/* Premium Minimal Dashboard Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-5">
        <div>
          <h3
            className="fw-extrabold text-dark tracking-tight mb-1"
            style={{ letterSpacing: "-0.5px" }}
          >
            Owner Dashboard
          </h3>
          <p className="text-secondary small mb-0">
            Manage your property listings and room vacancies real-time
          </p>
        </div>
        <div>
          <button
            className="btn btn-dark btn-sm px-4 py-2.5 rounded-pill fw-medium shadow-none"
            onClick={() => setShowAddProperty(true)}
          >
            + Add New Property
          </button>

          <AddProperty
            show={showAddProperty}
            onClose={() => setShowAddProperty(false)}
            onSuccess={() => {
              loadProperties();
              setShowAddProperty(false);
            }}
          />
        </div>
      </div>

      {/* Modern Low-Profile Data Table Surface */}
      <div className="card bg-white border border-light-subtle rounded-4 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table
              className="table table-hover align-middle mb-0"
              style={{ minWidth: "700px" }}
            >
              {/* Clean low-contrast header columns */}
              <thead className="table-light border-bottom border-light-subtle">
                <tr>
                  <th
                    className="p-3 ps-4 text-secondary small fw-semibold text-uppercase tracking-wider"
                    style={{ fontSize: "0.7rem" }}
                  >
                    PG Property Details
                  </th>
                  <th
                    className="p-3 text-secondary small fw-semibold text-uppercase tracking-wider"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Total Capacity
                  </th>
                  <th
                    className="p-3 text-center text-secondary small fw-semibold text-uppercase tracking-wider"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Management Operations
                  </th>
                </tr>
              </thead>

              <tbody className="border-0">
                {properties.map((pg) => (
                  <tr key={pg.id} className="border-bottom border-light-subtle">
                    <td className="p-3 ps-4">
                      <div className="fw-bold text-dark">{pg.name}</div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        ID: #00{pg.id}
                      </div>
                    </td>
                    <td className="p-3 text-secondary fw-medium small">
                      {pg.totalRooms} Rooms
                    </td>
                    <td className="p-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-light btn-sm border border-light-subtle rounded-pill px-3 fw-medium text-dark-hover"
                          style={{ fontSize: "0.75rem" }}
                          onClick={() => navigate(`/manageproperty/${pg.id}`)}
                        >
                          Manage Property
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
