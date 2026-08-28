import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllcomplaints, resolveComplaint } from "../../services/Complaints";

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);

  const token = sessionStorage.getItem("token");
  const { id } = useParams();

  const getComplaints = async () => {
    try {
      const result = await getAllcomplaints(id, token);

      console.log("Complaint Result:", result);

      if (result?.status === "success") {
        setComplaints(result.data || []);
      } else {
        toast.info(result?.error || "No complaints found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch complaints");
    }
  };

  const resolve = async (cmpId) => {
    try {
      const result = await resolveComplaint(cmpId, token);

      console.log("Resolve Result:", result);

      if (result?.status === "success") {
        toast.success("Complaint resolved successfully");

        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint.complaintId === cmpId
              ? {
                  ...complaint,
                  status: "RESOLVED",
                  resolvedDate: new Date().toLocaleDateString(),
                }
              : complaint,
          ),
        );
      } else {
        toast.info(result?.error || "Failed to resolve complaint");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to resolve complaint");
    }
  };

  useEffect(() => {
    if (id && token) {
      getComplaints();
    }
  }, [id, token]);

  const statusColorMap = {
    PENDING: "warning",
    IN_PROGRESS: "info",
    RESOLVED: "success",
    REJECTED: "danger",
  };

  const getStatusBadge = (status) => {
    const color = statusColorMap[status] || "secondary";

    return <span className={`badge bg-${color}`}>{status}</span>;
  };

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Complaint Management</h4>
        </div>

        <div className="card-body">
          {/* Dashboard Cards */}

          <div className="row mb-4">
            {/* Total */}

            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">Total</h6>

                  <h3>{complaints.length}</h3>
                </div>
              </div>
            </div>

            {/* Pending */}

            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">Pending</h6>

                  <h3 className="text-warning">
                    {complaints.filter((c) => c.status === "PENDING").length}
                  </h3>
                </div>
              </div>
            </div>

            {/* In Progress */}

            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">In Progress</h6>

                  <h3 className="text-info">
                    {
                      complaints.filter((c) => c.status === "IN_PROGRESS")
                        .length
                    }
                  </h3>
                </div>
              </div>
            </div>

            {/* Resolved */}

            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">Resolved</h6>

                  <h3 className="text-success">
                    {complaints.filter((c) => c.status === "RESOLVED").length}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {complaints.length === 0 ? (
            <div className="alert alert-light border text-center">
              No Complaints Found
            </div>
          ) : (
            <div className="row">
              {complaints.map((complaint) => (
                <div className="col-md-6 mb-4" key={complaint.complaintId}>
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      {/* Header */}

                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="fw-bold mb-1">{complaint.subject}</h5>

                          <small className="text-muted">
                            Complaint #{complaint.complaintId}
                          </small>
                        </div>

                        {getStatusBadge(complaint.status)}
                      </div>

                      <hr />

                      <p className="mb-2">
                        <strong>Tenant :</strong> {complaint.tenantName}
                      </p>

                      <p className="mb-2">
                        <strong>Room :</strong> {complaint.roomNumber}
                      </p>

                      <p className="mb-2">
                        <strong>Property :</strong> {complaint.propertyName}
                      </p>

                      <p className="mb-2">
                        <strong>Description :</strong>

                        <br />

                        {complaint.description}
                      </p>

                      <small className="text-muted">
                        Created : {complaint.createdDate}
                      </small>

                      {complaint.resolvedDate && (
                        <>
                          <br />

                          <small className="text-success">
                            Resolved : {complaint.resolvedDate}
                          </small>
                        </>
                      )}

                      {/* Action */}

                      <div className="text-end mt-3">
                        <button
                          className={`btn btn-sm text-white ${
                            complaint.status === "PENDING"
                              ? "btn-danger"
                              : complaint.status === "RESOLVED"
                                ? "btn-success"
                                : "btn-info"
                          }`}
                          disabled={complaint.status === "RESOLVED"}
                          onClick={() => resolve(complaint.complaintId)}
                        >
                          <i className="bi bi-check-circle me-1"></i>

                          {complaint.status === "RESOLVED"
                            ? "Resolved"
                            : "Resolve"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintManagement;
