import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRooms } from "../../services/room";
import ManageRoomCard from "../../components/room/ManageRoomCard";
import { Modal } from "react-bootstrap";
import AddRoom from "./AddRoom";

const RoomManagement = () => {
  const { id } = useParams();

  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  const token = sessionStorage.getItem("token");

  const getPgRooms = async () => {
    const response = await getRooms(id, token);

    if (response.status === "success") {
      setRooms(response.data);
    }
  };

  useEffect(() => {
    getPgRooms();
  }, [id]);

  return (
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Room Management</h4>

          <small className="text-muted">
            Manage all rooms of this property
          </small>
        </div>

        <button
          className="btn btn-primary rounded-pill"
          onClick={() => setShowAddRoomModal(true)}
        >
          <FaPlus className="me-2" />
          Add Room
        </button>
      </div>

      {/* Rooms */}
      <div className="row g-4">
        {rooms.length === 0 ? (
          <div className="text-center text-muted py-5">No rooms found</div>
        ) : (
          rooms.map((room) => (
            <div className="col-lg-4 col-md-6" key={room.id}>
              <ManageRoomCard room={room} />
            </div>
          ))
        )}
      </div>

      {/* Add Room Modal */}
      <Modal
        show={showAddRoomModal}
        onHide={() => setShowAddRoomModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddRoom
            pgId={id}
            onSuccess={(newRoom) => {
              if (newRoom && newRoom.id) {
                setRooms((prevRooms) => [...prevRooms, newRoom]);
              } else {
                getPgRooms();
              }

              setShowAddRoomModal(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoomManagement;
