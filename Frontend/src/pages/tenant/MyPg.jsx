import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaUserTie,
  FaBed,
  FaWifi,
  FaParking,
  FaUtensils,
} from "react-icons/fa";
import { getMyPg } from "../../services/booking";

function MyPG() {
  const [pg, setPg] = useState(null);

  useEffect(() => {
    const loadMyPg = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const result = await getMyPg(token);

        console.log(result);

        setPg(result?.data || null);
      } catch (error) {
        console.log(error);
        setPg(null);
      }
    };

    loadMyPg();
  }, []);

  if (!pg) {
    return (
      <div className="container mt-5 text-center">
        <div className="card shadow border-0 p-5">
          <FaBuilding size={50} className="text-muted mb-3" />

          <h4 className="text-muted">No booking available</h4>

          <p className="text-secondary mb-0">
            You currently don't have an active PG booking.
          </p>
        </div>
      </div>
    );
  }

  const facilities = pg.property?.amenity ? pg.property.amenity.split(",") : [];

  return (
    <div className="container-fluid p-4">
      <h2 className="text-primary mb-4">
        <FaBuilding className="me-2" />
        My PG
      </h2>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">{pg.property?.name}</h4>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5>
                <FaUserTie className="me-2 text-primary" />
                Owner
              </h5>
              <p>{pg.ownerName}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h5>
                <FaPhone className="me-2 text-success" />
                Contact
              </h5>
              <p>{pg.property?.contact}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h5>
                <FaMapMarkerAlt className="me-2 text-danger" />
                Address
              </h5>

              <p>
                {pg.property?.address?.area}, {pg.property?.address?.city},{" "}
                {pg.property?.address?.state}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <h5>
                <FaBed className="me-2 text-warning" />
                Room
              </h5>

              <p>{pg.roomNumber}</p>
            </div>

            <div className="col-md-6">
              <h5>Monthly Rent</h5>

              <span className="badge bg-success fs-6">
                ₹{pg.monthlyRent} / Month
              </span>
            </div>

            <div className="col-md-6">
              <h5>Status</h5>

              <span className="badge bg-primary fs-6">{pg.bookingStatus}</span>
            </div>
          </div>

          <hr />

          <h4 className="mb-3">Facilities</h4>

          <div className="row">
            {facilities.map((item, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <div className="card border-primary text-center">
                  <div className="card-body">
                    {item.trim() === "WiFi" && (
                      <FaWifi className="fs-2 text-primary mb-2" />
                    )}

                    {item.trim() === "Parking" && (
                      <FaParking className="fs-2 text-success mb-2" />
                    )}

                    {item.trim() === "Food" && (
                      <FaUtensils className="fs-2 text-danger mb-2" />
                    )}

                    {item.trim() !== "WiFi" &&
                      item.trim() !== "Parking" &&
                      item.trim() !== "Food" && (
                        <FaBuilding className="fs-2 text-warning mb-2" />
                      )}

                    <h6>{item}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPG;
