function OwnerRegistration({
  businessName,
  setBusinessName,
  accountNumber,
  setAccountNumber,
  gstNumber,
  setGstNumber,
  licensePhoto,
  setLicensePhoto,
  licenseNumber,
  setLicenseNumber,
}) {
  return (
    <div>
      <h5 className="mb-3">Owner Information</h5>

      <div className="mb-3">
        <label className="form-label">Business Name</label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Account Number</label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">GST Number</label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter GST number"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">License Number</label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter license number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">License Photo</label>

        <input
          type="file"
          className="form-control"
          onChange={(e) => setLicensePhoto(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default OwnerRegistration;