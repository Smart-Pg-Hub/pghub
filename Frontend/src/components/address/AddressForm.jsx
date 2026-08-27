import React, { useState } from "react";
import { getAddressByPincode } from "../../services/pincode";

const AddressForm = ({ address, setAddress }) => {
  const [villages, setVillages] = useState([]);

  const onAddressChange = async (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "pincode" && value.length === 6) {
      const result = await getAddressByPincode(value);

      if (result && result.data && result.data[0].Status === "Success") {
        const postOffice = result.data[0].PostOffice;

        setVillages(postOffice);

        setAddress((prev) => ({
          ...prev,

          pincode: value,

          city: postOffice[0].District,

          state: postOffice[0].State,
        }));
      } else {
        setVillages([]);

        setAddress((prev) => ({
          ...prev,

          city: "",
          state: "",
          area: "",
        }));
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <label className="form-label">Pincode</label>

        <input
          type="text"
          className="form-control"
          name="pincode"
          maxLength={6}
          value={address.pincode}
          onChange={onAddressChange}
          placeholder="Enter Pincode"
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">Village / Area</label>

        <select
          className="form-select"
          name="area"
          value={address.area}
          onChange={onAddressChange}
        >
          <option value="">Select Village</option>

          {villages.map((village, index) => (
            <option key={index} value={village.Name}>
              {village.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">City</label>

        <input
          type="text"
          className="form-control"
          value={address.city}
          readOnly
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">State</label>

        <input
          type="text"
          className="form-control"
          value={address.state}
          readOnly
        />
      </div>
    </div>
  );
};

export default AddressForm;
