import { checkout, getTenantDetailsByPgId } from "../../services/booking";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

const TenantManagement = () => {
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [actionType, setActionType] = useState("");

  const token = sessionStorage.getItem("token");

  const getDetails = async () => {
    try {
      const response = await getTenantDetailsByPgId(id, token);

      console.log("Tenant details:", response);

      if (response.status === "success") {
        setDetails(response.data);
      } else {
        toast.error(response.error || "Failed to load tenants");
      }
    } catch (error) {
      console.error("Failed to load tenant details:", error);
      toast.error(
        error.response?.data?.message || "Failed to load tenant details",
      );
    }
  };

  const handleCheckoutAction = (bookingId, action) => {
    setSelectedBookingId(bookingId);
    setActionType(action);
    setShowConfirm(true);
  };

  const confirmCheckoutAction = async () => {
    try {
      if (!selectedBookingId || !actionType) {
        toast.error("Invalid checkout request");
        return;
      }

      console.log("Booking ID:", selectedBookingId);
      console.log("Checkout Action:", actionType);

      const response = await checkout(selectedBookingId, actionType, token);

      if (response.status === "success") {
        if (actionType === "APPROVE") {
          toast.success("Checkout approved successfully");
        } else {
          toast.info("Checkout request rejected");
        }

        await getDetails();
      } else {
        toast.error(response.error || "Checkout action failed");
      }
    } catch (error) {
      console.error("Checkout action error:", error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setShowConfirm(false);
      setSelectedBookingId(null);
      setActionType("");
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Tenant Management</h4>
      </div>

      {/* Tenant Table */}
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light text-center">
              <tr>
                <th>Name</th>
                <th>Room No.</th>
                <th>Room Type</th>
                <th>Phone</th>
                <th>Check-in Date</th>
                <th>
                  Checkout
                  <br />
                  Request
                </th>
              </tr>
            </thead>

            <tbody>
              {details.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No tenants found
                  </td>
                </tr>
              ) : (
                details.map((tenant) => {
                  const checkoutRequested =
                    tenant.checkoutStatus === "REQUESTED";

                  return (
                    <tr key={tenant.bookingId}>
                      <td>
                        <strong>
                          {tenant.firstName} {tenant.lastName}
                        </strong>
                      </td>

                      <td>{tenant.roomNumber}</td>

                      <td>{tenant.roomCapacity} Sharing</td>

                      <td>{tenant.phone}</td>

                      <td>{tenant.joiningDate}</td>

                      <td className="text-center">
                        {checkoutRequested ? (
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() =>
                                handleCheckoutAction(
                                  tenant.bookingId,
                                  "APPROVE",
                                )
                              }
                            >
                              Approve
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleCheckoutAction(tenant.bookingId, "REJECT")
                              }
                            >
                              Reject
                            </button>
                          </div>
                        ) : tenant.checkoutStatus === "REJECTED" ? (
                          <span className="badge bg-danger px-3 py-2">
                            Rejected
                          </span>
                        ) : tenant.checkoutStatus === "APPROVED" ? (
                          <span className="badge bg-success px-3 py-2">
                            Approved
                          </span>
                        ) : (
                          <span className="badge bg-secondary px-3 py-2">
                            No Request
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === "APPROVE" ? "Approve Checkout" : "Reject Checkout"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <p className="mb-0">
            Are you sure you want to{" "}
            <strong>{actionType === "APPROVE" ? "approve" : "reject"}</strong>{" "}
            this checkout request?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowConfirm(false);
              setSelectedBookingId(null);
              setActionType("");
            }}
          >
            No
          </button>

          <button
            className={
              actionType === "APPROVE" ? "btn btn-success" : "btn btn-danger"
            }
            onClick={confirmCheckoutAction}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TenantManagement;
