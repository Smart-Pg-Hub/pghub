function TenantRegistration({
  guardianNumber,
  setGuardianNumber,
  category,
  setCategory,
}) {
  return (
    <div className="border rounded-3 p-3 mb-3">
      <h5 className="mb-3">Tenant Information</h5>

      <div className="mb-3">
        <label className="form-label">Guardian Number</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter guardian number"
          value={guardianNumber}
          onChange={(e) => setGuardianNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tenant Category</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="FAMILY">Family</option>
          <option value="WORKING">Working</option>
        </select>
      </div>
    </div>
  );
}

export default TenantRegistration;