import { useState } from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaStar,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AddPropertyPhotos from "./AddPropertyPhotos";

const PropertyInfo = ({ property }) => {
  console.log(property);

  const navigate = useNavigate();

  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <div>
      {/* Back Button */}
      <button
        className="btn btn-link text-decoration-none text-dark p-0 mb-4"
        onClick={() => navigate("/owner")}
      >
        <FaArrowLeft className="me-2" />
        Back to Dashboard
      </button>

      <div className="row align-items-center">

        {/* Property Image */}
        <div className="col-lg-2 text-center mb-3 mb-lg-0">
          <img
            src={property?.propertyProfilePhoto}
            alt="Property"
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>

        {/* Property Details */}
        <div className="col-lg-5">
          <div className="d-flex align-items-center gap-3">
            <h2 className="fw-bold mb-0">{property?.name}</h2>

            <span className="badge bg-success">Active</span>
          </div>

          <p className="text-muted mt-3 mb-2">
            <FaMapMarkerAlt className="me-2 text-danger" />
            {property?.address?.area}, {property?.address?.city},{" "}
            {property?.address?.state}, {property?.address?.pincode}
          </p>

          <p className="mb-2">{property?.pgType}</p>
        </div>

        {/* Add Photos Button */}
        <div className="col-lg-5 text-lg-end text-center mt-3 mt-lg-0">
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={() => setShowPhotos(true)}
          >
            <FaPlus className="me-2" />
            Add Photos
          </button>
        </div>

        <AddPropertyPhotos
          property={property}
          show={showPhotos}
          onClose={() => setShowPhotos(false)}
        />

      </div>
    </div>
  );
};

export default PropertyInfo;