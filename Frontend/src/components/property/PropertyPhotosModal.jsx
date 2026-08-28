import React, { useEffect, useState } from "react";
import { getPropertyPhotosByPgId } from "../../services/property";

const PropertyPhotosModal = ({ propertyId, show, onClose }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!show || !propertyId) return;

    const fetchPhotos = async () => {
      setLoading(true);

      const result = await getPropertyPhotosByPgId(propertyId, token);

      if (result.status === "success") {
        setPhotos(result.data.photoUrls || []);
      } else {
        setPhotos([]);
      }

      setLoading(false);
    };

    fetchPhotos();
  }, [show, propertyId]);

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Property Photos</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3 text-secondary">Loading photos...</p>
              </div>
            )}

            {!loading && photos.length === 0 && (
              <div className="text-center py-5">
                <h5 className="text-secondary">No photos available</h5>
              </div>
            )}

            {!loading && photos.length > 0 && (
              <div className="row g-3">
                {photos.map((photo, index) => (
                  <div className="col-md-4 col-lg-3" key={index}>
                    <img
                      src={photo}
                      alt={`Property ${index + 1}`}
                      className="img-fluid rounded shadow-sm"
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPhotosModal;
