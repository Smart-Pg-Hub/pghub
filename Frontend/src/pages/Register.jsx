// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerUser, registerTenant, registerOwner } from "../services/user";
// import AddressForm from "../components/address/AddressForm";
// import TenantRegistration from "../components/registration/TenantRegistration";
// import OwnerRegistration from "../components/registration/OwnerRegistration";

// function Register() {
//   const navigate = useNavigate();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("");
//   const [dob, setDob] = useState("");
//   const [role, setRole] = useState("TENANT");
//   const [idProof, setIdProof] = useState("ADHAR_CARD");
//   const [idProofPhoto, setIdProofPhoto] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [avtarPhoto, setAvtarPhoto] = useState(null);

//   const [address, setAddress] = useState({
//     area: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [guardianNumber, setGuardianNumber] = useState("");
//   const [category, setCategory] = useState("STUDENT");

//   const [businessName, setBusinessName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [gstNumber, setGstNumber] = useState("");
//   const [licensePhoto, setLicensePhoto] = useState(null);
//   const [licenseNumber, setLicenseNumber] = useState("");

//   const today = new Date().toISOString().split("T")[0];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !phone ||
//       !password ||
//       !gender ||
//       !dob
//     ) {
//       toast.warning("Please fill all required fields");
//       return;
//     }

//     if (dob >= today) {
//       toast.error("Date of birth must be in the past");
//       return;
//     }

//     if (role === "TENANT" && !guardianNumber) {
//       toast.warning("Please enter guardian number");
//       return;
//     }

//     if (
//       role === "OWNER" &&
//       (!businessName ||
//         !accountNumber ||
//         !gstNumber ||
//         !licenseNumber ||
//         !licensePhoto)
//     ) {
//       toast.warning("Please fill all owner details");
//       return;
//     }

//     const user = {
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//       gender,
//       dob,
//       role,
//       idProof,
//     };

//     const formData = new FormData();

//     Object.entries(user).forEach(([key, value]) => formData.append(key, value));

//     formData.append("address.area", address.area);
//     formData.append("address.city", address.city);
//     formData.append("address.state", address.state);
//     formData.append("address.pincode", address.pincode);
//     formData.append("avtarPhoto", avtarPhoto);

//     if (idProofPhoto) {
//       formData.append("idProofPhoto", idProofPhoto);
//     }

//     const response = await registerUser(formData);

//     if (response.status !== "success") {
//       toast.error(response.error ? response.error : "Registration Failed");
//       return;
//     }

//     const userId = response.data;

//     if (role === "TENANT") {
//       const tenant = {
//         userId,
//         guardianNumber,
//         category,
//       };

//       const tenantResponse = await registerTenant(tenant);

//       if (tenantResponse.status === "success") {
//         toast.success("Tenant Registration Successfully");
//         navigate("/login");
//       } else {
//         toast.error(
//           tenantResponse.error
//             ? tenantResponse.error
//             : "Tenant Registration Failed",
//         );
//       }

//       return;
//     }

//     if (role === "OWNER") {
//       const owner = {
//         userId,
//         businessName,
//         accountNumber,
//         gstNumber,
//         licenseNumber,
//       };

//       const ownerFormData = new FormData();

//       Object.entries(owner).forEach(([key, value]) =>
//         ownerFormData.append(key, value),
//       );

//       ownerFormData.append("licensePhoto", licensePhoto);

//       const ownerResponse = await registerOwner(ownerFormData);

//       if (ownerResponse.status === "success") {
//         toast.success("Owner Registration Successfully");
//         navigate("/login");
//       } else {
//         toast.error(
//           ownerResponse.error
//             ? ownerResponse.error
//             : "Owner Registration Failed",
//         );
//       }
//     }
//   };

//   return (
//     <div
//       className="card shadow rounded-4 p-4 mx-auto"
//       style={{ maxWidth: "700px" }}
//     >
//       <h3 className="mb-4">Create Account</h3>

//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">First Name</label>
//             <input
//               className="form-control"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Last Name</label>
//             <input
//               className="form-control"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Phone</label>
//             <input
//               className="form-control"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Role</label>
//             <select
//               className="form-select"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="TENANT">Tenant</option>
//               <option value="OWNER">Owner</option>
//             </select>
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Gender</label>
//             <select
//               className="form-select"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//             </select>
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Date Of Birth</label>
//             <input
//               type="date"
//               className="form-control"
//               value={dob}
//               max={today}
//               onChange={(e) => setDob(e.target.value)}
//             />
//           </div>
//         </div>

//         <h5 className="mb-3">Address Details</h5>

//         <AddressForm address={address} setAddress={setAddress} />

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">ID Proof</label>
//             <select
//               className="form-select"
//               value={idProof}
//               onChange={(e) => setIdProof(e.target.value)}
//             >
//               <option value="ADHAR_CARD">Aadhar Card</option>
//               <option value="PAN_CARD">PAN Card</option>
//               <option value="PASSPORT">Passport</option>
//             </select>
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Profile Photo</label>

//             {avtarPhoto && (
//               <div className="mb-2">
//                 <img
//                   src={URL.createObjectURL(avtarPhoto)}
//                   width="100"
//                   className="img-thumbnail"
//                 />
//               </div>
//             )}

//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 setAvtarPhoto(file);
//               }}
//             />
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">ID Photo</label>
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 setIdProofPhoto(file);

//                 if (file) {
//                   setPreview(URL.createObjectURL(file));
//                 }
//               }}
//             />
//           </div>
//         </div>

//         {preview && (
//           <div className="text-center mb-3">
//             <img src={preview} width="200" className="img-thumbnail" />
//           </div>
//         )}

//         {role === "TENANT" && (
//           <TenantRegistration
//             guardianNumber={guardianNumber}
//             setGuardianNumber={setGuardianNumber}
//             category={category}
//             setCategory={setCategory}
//           />
//         )}

//         {role === "OWNER" && (
//           <OwnerRegistration
//             businessName={businessName}
//             setBusinessName={setBusinessName}
//             accountNumber={accountNumber}
//             setAccountNumber={setAccountNumber}
//             gstNumber={gstNumber}
//             setGstNumber={setGstNumber}
//             licensePhoto={licensePhoto}
//             setLicensePhoto={setLicensePhoto}
//             licenseNumber={licenseNumber}
//             setLicenseNumber={setLicenseNumber}
//           />
//         )}

//         <div className="my-3">
//           Already have account?
//           <Link to="/login" className="ms-2">
//             Login
//           </Link>
//         </div>

//         <button type="submit" className="btn btn-dark w-100 rounded-pill">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, registerTenant, registerOwner } from "../services/user";
import AddressForm from "../components/address/AddressForm";
import TenantRegistration from "../components/registration/TenantRegistration";
import OwnerRegistration from "../components/registration/OwnerRegistration";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("TENANT");
  const [idProof, setIdProof] = useState("ADHAR_CARD");
  const [idProofPhoto, setIdProofPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [avtarPhoto, setAvtarPhoto] = useState(null);
  const [address, setAddress] = useState({
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [guardianNumber, setGuardianNumber] = useState("");
  const [category, setCategory] = useState("STUDENT");

  const [businessName, setBusinessName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (dob >= today) {
      toast.error("Date of birth must be in the past");
      return;
    }

    if (role === "TENANT" && !guardianNumber) {
      toast.warning("Please enter guardian number");
      return;
    }

    if (
      role === "OWNER" &&
      (!businessName ||
        !accountNumber ||
        !gstNumber ||
        !licenseNumber ||
        !licensePhoto)
    ) {
      toast.warning("Please fill all owner details");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      role,
      idProof,
    };

    const formData = new FormData();

    Object.entries(user).forEach(([key, value]) => formData.append(key, value));

    formData.append("address.area", address.area);
    formData.append("address.city", address.city);
    formData.append("address.state", address.state);
    formData.append("address.pincode", address.pincode);
    formData.append("avtarPhoto", avtarPhoto);

    if (idProofPhoto) {
      formData.append("idProofPhoto", idProofPhoto);
    }

    const response = await registerUser(formData);

    if (response.status !== "success") {
      toast.error(response.error ? response.error : "Registration Failed");
      return;
    }

    const userId = response.data;

    if (role === "TENANT") {
      const tenant = {
        userId,
        guardianNumber,
        category,
      };

      const tenantResponse = await registerTenant(tenant);

      if (tenantResponse.status === "success") {
        toast.success("Tenant Registration Successfully");
        navigate("/login");
      } else {
        toast.error(
          tenantResponse.error
            ? tenantResponse.error
            : "Tenant Registration Failed",
        );
      }

      return;
    }

    if (role === "OWNER") {
      const owner = {
        userId,
        businessName,
        accountNumber,
        gstNumber,
        licenseNumber,
      };

      const ownerFormData = new FormData();

      Object.entries(owner).forEach(([key, value]) =>
        ownerFormData.append(key, value),
      );

      ownerFormData.append("licensePhoto", licensePhoto);

      const ownerResponse = await registerOwner(ownerFormData);

      if (ownerResponse.status === "success") {
        toast.success("Owner Registration Successfully");
        navigate("/login");
      } else {
        toast.error(
          ownerResponse.error
            ? ownerResponse.error
            : "Owner Registration Failed",
        );
      }
    }
  };

  return (
    <div
      className="card shadow rounded-4 p-4 mx-auto"
      style={{ maxWidth: "700px" }}
    >
      <h3 className="mb-4">Create Account</h3>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="TENANT">Tenant</option>
              <option value="OWNER">Owner</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date Of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              max={today}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>

        <h5 className="mb-3">Address Details</h5>

        <AddressForm address={address} setAddress={setAddress} />

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">ID Proof</label>
            <select
              className="form-select"
              value={idProof}
              onChange={(e) => setIdProof(e.target.value)}
            >
              <option value="ADHAR_CARD">Aadhar Card</option>
              <option value="PASSPORT">Passport</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Profile Photo</label>

            {avtarPhoto && (
              <div className="mb-2">
                <img
                  src={URL.createObjectURL(avtarPhoto)}
                  width="100"
                  className="img-thumbnail"
                />
              </div>
            )}

            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                setAvtarPhoto(file);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">ID Photo</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                setIdProofPhoto(file);

                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>

        {preview && (
          <div className="text-center mb-3">
            <img src={preview} width="200" className="img-thumbnail" />
          </div>
        )}

        {role === "TENANT" && (
          <TenantRegistration
            guardianNumber={guardianNumber}
            setGuardianNumber={setGuardianNumber}
            category={category}
            setCategory={setCategory}
          />
        )}

        {role === "OWNER" && (
          <OwnerRegistration
            businessName={businessName}
            setBusinessName={setBusinessName}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            gstNumber={gstNumber}
            setGstNumber={setGstNumber}
            licensePhoto={licensePhoto}
            setLicensePhoto={setLicensePhoto}
            licenseNumber={licenseNumber}
            setLicenseNumber={setLicenseNumber}
          />
        )}

        <div className="my-3">
          Already have account?
          <Link to="/login" className="ms-2">
            Login
          </Link>
        </div>

        <button type="submit" className="btn btn-dark w-100 rounded-pill">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
