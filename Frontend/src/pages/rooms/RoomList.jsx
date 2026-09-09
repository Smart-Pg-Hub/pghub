import { useNavigate } from "react-router-dom";
import RoomCard from "../../components/room/RoomCard";

const RoomList = ({ rooms = [], propertyId }) => {
  const navigate = useNavigate();

  const onBookNow = (room) => {
    navigate("/booking", {
      state: { room },
    });
  };

  return (
    <div className="row">
      {rooms.map((room) => (
        <div className="col-md-6 col-lg-4 mb-4" key={room.id}>
          <RoomCard room={room} propertyId={propertyId} onBookNow={onBookNow} />
        </div>
      ))}
    </div>
  );
};

export default RoomList;
