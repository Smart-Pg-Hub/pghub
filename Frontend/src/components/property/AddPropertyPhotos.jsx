import React, { useState } from "react";
import { toast } from "react-toastify";
import { addPropertyPhotos } from "../../services/property";

const AddPropertyPhotos = ({ property, show, onClose }) => {
  const [photos, setPhotos] = useState([]);

  const onPhotoChange = (e) => {
    const files = Array.from(e.target.files);

    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (photos.length === 0) {
      toast.warning("Please select photos");
      return;
    }

    const formData = new FormData();

    formData.append("propertyId", property.id);

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    const token = sessionStorage.getItem("token");

    const result = await addPropertyPhotos(formData, token);

    if (result.status === "success") {
      toast.success("Photos added successfully");
      setPhotos([]);
      onClose();
    } else {
      toast.error(result.error || "Failed to add photos");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Property Photos</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Select Property Photos</label>

                <input
                  type="file"
                  className="form-control"
                  multiple
                  accept="image/*"
                  onChange={onPhotoChange}
                />
              </div>

              {photos.length > 0 && (
                <div className="row">
                  {photos.map((photo, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Property"
                        className="img-fluid rounded-3 shadow-sm"
                        style={{
                          height: "150px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={photos.length === 0}
              >
                Add Photos
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPhotos;
