import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addRoom } from "../../services/room";

const AddRoom = ({ pgId, onSuccess, onCancel }) => {
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    pgId: pgId,
    roomNumber: "",
    roomCapacity: "",
    amount: "",
    floorNumber: "",
    securityDeposit: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setRoom((prev) => ({ ...prev, pgId }));
  }, [pgId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoom({
      ...room,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room.pgId) {
      toast.error("Missing property (pgId) — cannot add room");
      return;
    }

    if (
      room.roomCapacity === "" ||
      Number(room.roomCapacity) < 1 ||
      !Number.isInteger(Number(room.roomCapacity))
    ) {
      toast.error("Room capacity must be a positive number (at least 1)");
      return;
    }

    if (room.amount === "" || Number(room.amount) <= 0) {
      toast.error("Rent amount must be a positive number");
      return;
    }

    if (room.securityDeposit !== "" && Number(room.securityDeposit) < 0) {
      toast.error("Security deposit cannot be negative");
      return;
    }

    const token = sessionStorage.getItem("token");

    setSubmitting(true);
    try {
      const result = await addRoom(room, token);

      if (result.status === "success") {
        toast.success("Room Added Successfully");
        const createdRoom = result.data ?? result.room ?? result;

        if (onSuccess) {
          onSuccess(createdRoom);
        }
      } else {
        console.error("addRoom failed:", result.error);
        toast.error(result.error || "Failed to add room");
      }
    } catch (err) {
      console.error("addRoom threw an error:", err);
      toast.error(
        "Something went wrong while adding the room. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="container mt-4">
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Header className="bg-primary text-white rounded-top-4 py-3">
          <h4 className="mb-0">Add New Room</h4>
        </Card.Header>

        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Room Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="roomNumber"
                    placeholder="e.g. A-101"
                    value={room.roomNumber}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="roomCapacity"
                    placeholder="Number of beds"
                    value={room.roomCapacity}
                    onChange={handleChange}
                    className="rounded-3 py-2"
                    min="1"
                    step="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Rent Amount</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text rounded-start-3">₹</span>
                    <Form.Control
                      type="number"
                      name="amount"
                      placeholder="Monthly rent"
                      value={room.amount}
                      onChange={handleChange}
                      className="py-2"
                      min="0"
                      step="1"
                      required
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Security Deposit
                  </Form.Label>
                  <div className="input-group">
                    <span className="input-group-text rounded-start-3">₹</span>
                    <Form.Control
                      type="number"
                      name="securityDeposit"
                      placeholder="Security deposit"
                      value={room.securityDeposit}
                      onChange={handleChange}
                      className="py-2"
                      min="0"
                      step="1"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Floor Number</Form.Label>
              <Form.Control
                type="number"
                name="floorNumber"
                placeholder="Floor Number"
                value={room.floorNumber}
                onChange={handleChange}
                className="rounded-3 py-2"
                min="0"
                step="1"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Add any extra details about the room..."
                value={room.description}
                onChange={handleChange}
                className="rounded-3"
              />
            </Form.Group>

            <hr className="my-4" />

            <div className="text-end">
              <Button
                type="button"
                variant="outline-secondary"
                className="me-2 px-4 rounded-pill"
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="px-4 rounded-pill"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Adding...
                  </>
                ) : (
                  "Add Room"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddRoom;
