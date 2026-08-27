import { FaDoorOpen, FaBed, FaCheckCircle } from "react-icons/fa";

const DashboardCards = ({ rooms }) => {
  const totalRooms = rooms.length;

  const totalBeds = rooms.reduce((total, room) => total + room.roomCapacity, 0);
  const occupiedBeds = rooms.reduce(
    (total, room) => total + room.occupiedBeds,
    0,
  );

  const availableBeds = totalBeds - occupiedBeds;

  const cards = [
    {
      title: "Total Rooms",
      value: totalRooms,
      icon: <FaDoorOpen size={28} />,
      bg: "primary",
    },
    {
      title: "Occupied Beds",
      value: `${occupiedBeds} / ${totalBeds}`,
      icon: <FaBed size={28} />,
      bg: "success",
    },
    {
      title: "Available Beds",
      value: availableBeds,
      icon: <FaCheckCircle size={28} />,
      bg: "warning",
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card, index) => (
        <div className="col-md-6 col-lg-4" key={index}>
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted fw-semibold">{card.title}</small>

                  <h3 className="fw-bold mt-2 mb-0">{card.value}</h3>
                </div>

                <div
                  className={`bg-${card.bg} text-white rounded-circle d-flex align-items-center justify-content-center`}
                  style={{ width: "60px", height: "60px" }}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
