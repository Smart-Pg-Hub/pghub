import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaExclamationCircle, FaPaperPlane } from "react-icons/fa";
import { createComplaints, getComplaints } from "../../services/Complaints";

function Complaints() {
  const token = sessionStorage.getItem("token");

  const [complaints, setComplaints] = useState([]);

  const [data, setData] = useState({
    subject: "",
    description: "",
  });

  const statusColorMap = {
    PENDING: "warning",
    IN_PROGRESS: "info",
    RESOLVED: "success",
    REJECTED: "danger",
  };

  const getStatusColor = (status) => statusColorMap[status] || "secondary";

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const loadComplaints = async () => {
    const result = await getComplaints(token);

    if (result.status === "success") {
      setComplaints(result.data);
    } else {
      toast.error(result.error);
    }
  };

useEffect(() => {
  loadComplaints();
}, []);

const handleSubmit = async () => {
  if (!data.subject || !data.description.trim()) {
    toast.error("Please fill all fields");
    return;
  }

  const result = await createComplaints(data, token);

  if (result.status === "success") {
    toast.success(result.data);

    setData({
      subject: "",
      description: "",
    });

    loadComplaints();
  } else {
    toast.error("No active booking found");
    
  }
};

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex align-items-center gap-2 mb-4">
        <FaExclamationCircle size={26} className="text-primary" />
        <h2 className="fw-bold mb-0">Complaints</h2>
      </div>

      <div className="card shadow-sm border-0 rounded-4 mb-5">
        <div className="card-body">
          <h5 className="mb-4">Raise a New Complaint</h5>

          <div className="mb-3">
            <label className="form-label">Complaint Type</label>

            <select
              name="subject"
              className="form-select"
              value={data.subject}
              onChange={handleChange}
            >
              <option value="">-- Select Complaint Type --</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Electricity Issue">Electricity Issue</option>
              <option value="Plumbing Issue">Plumbing Issue</option>
              <option value="Room Cleaning">Room Cleaning</option>
              <option value="Bathroom Cleaning">Bathroom Cleaning</option>
              <option value="Wi-Fi Not Working">Wi-Fi Not Working</option>
              <option value="Fan/AC Repair">Fan/AC Repair</option>
              <option value="Furniture Damage">Furniture Damage</option>
              <option value="Food Quality">Food Quality</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Security Issue">Security Issue</option>
              <option value="Noise Complaint">Noise Complaint</option>
              <option value="Pest Control">Pest Control</option>
              <option value="Common Area Maintenance">
                Common Area Maintenance
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>

            <textarea
              rows="4"
              name="description"
              className="form-control"
              placeholder="Describe your complaint..."
              value={data.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="text-end">
            <button className="btn btn-primary" onClick={handleSubmit}>
              <FaPaperPlane className="me-2" />
              Submit Complaint
            </button>
          </div>
        </div>
      </div>

      <h4 className="mb-3">My Complaints</h4>

      {complaints.length === 0 ? (
        <div className="alert alert-light border text-center">
          No complaints found.
        </div>
      ) : (
        <div className="row">
          {complaints.map((complaint) => (
            <div className="col-md-6 mb-3" key={complaint.complaintId}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5>{complaint.subject}</h5>

                    <span
                      className={`badge bg-${getStatusColor(complaint.status)}`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <hr />

                  <p>
                    <strong>Property :</strong> {complaint.propertyName}
                  </p>

                  <p>
                    <strong>Room :</strong> {complaint.roomNumber}
                  </p>

                  <p>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Complaints;
