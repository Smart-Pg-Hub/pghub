import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { userUpdate } from "../../services/user";
import avatar from "../../assets/avatar.jpg";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(user.avtarPhoto);

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user.phone);
  const [image, setImage] = useState(null);

  const token = sessionStorage.getItem("token");

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }
  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("phone", phone);

    if (image) {
      formData.append("avtarPhoto", image);
    }

    const result = await userUpdate(formData, token);
    console.log(result);

    if (result.status === "success") {
      const updatedUser = {
        ...user,
        phone: phone,
        avtarPhoto: result.data,
      };

      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setProfilePhoto(result.data);
      setImage(null);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } else {
      toast.error(result.error || "Failed to update profile");
    }
  };

  function handleCancel() {
    setPhone(user.phone);
    setImage(null);
    setIsEditing(false);
  }

  return (
    <div>
      <h3>My Profile</h3>

      <div className="card-body">
        <div className="row">
          <div className="col-md-4 text-center border-end">
            <img
              src={image ? URL.createObjectURL(image) : profilePhoto || avatar}
              alt="Profile"
              className="rounded-circle img-thumbnail mb-3"
              width="180"
            />

            {isEditing && (
              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}

            <h4 className="mb-1">
              {user.firstName} {user.lastName}
            </h4>

            <span className="badge bg-success px-3 py-2">{user.role}</span>
          </div>

          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">First Name</label>
                <input
                  className="form-control"
                  value={user.firstName}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.lastName}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Phone{" "}
                  {isEditing && (
                    <span className="badge bg-primary ms-2">Editable</span>
                  )}
                </label>

                <input
                  type="text"
                  className={`form-control ${isEditing ? "border-primary" : ""}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Date of Birth</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.dob || ""}
                  readOnly
                />
              </div>

              <div className="col-md-12">
                <label className="form-label fw-bold">Address</label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={`${user.address?.area || ""}, ${user.address?.city || ""}, ${user.address?.state || ""}, ${user.address?.pincode || ""}`}
                  readOnly
                />
              </div>

              <div className="col-md-12 text-center mt-4">
                {!isEditing ? (
                  <button
                    className="btn btn-primary px-4"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleUpdate}
                    >
                      Save Changes
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
