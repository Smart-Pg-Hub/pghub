// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../services/user";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await loginUser({ email, password });

//     if (response.status === "success") {
//       toast.success("Login successful");
//       login(response.data);

//       if (response.data.user.role === "TENANT") {
//         navigate("/");
//       } else if (response.data.user.role === "OWNER") {
//         navigate("/owner");
//       } else {
//         navigate("/");
//       }
//     } else {
//       toast.error(
//         response.error
//           ? typeof response.error === "string"
//             ? response.error
//             : Object.values(response.error)[0]
//           : "Something went wrong",
//       );
//     }
//   };

//   return (
//     <div
//       className="container py-5 d-flex justify-content-center align-items-center"
//       style={{ minHeight: "75vh" }}
//     >
//       <div
//         className="card bg-white border border-light-subtle rounded-4 shadow-sm p-4 p-md-5"
//         style={{ maxWidth: "420px", width: "100%" }}
//       >
//         <div className="text-center mb-4">
//           <h3
//             className="fw-extrabold text-dark tracking-tight mb-1"
//             style={{ letterSpacing: "-0.5px" }}
//           >
//             Welcome back
//           </h3>
//           <p className="text-secondary small">
//             Enter your credentials to access your pgHub account
//           </p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label small fw-semibold text-secondary mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="form-control rounded-3 border-light-subtle shadow-none py-2 px-3 text-secondary small"
//               placeholder="name@example.com"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <div className="d-flex justify-content-between align-items-center mb-1">
//               <label className="form-label small fw-semibold text-secondary m-0">
//                 Password
//               </label>
//               <a
//                 href="#forgot"
//                 className="text-decoration-none small text-muted link-dark"
//                 style={{ fontSize: "0.75rem" }}
//               >
//                 Forgot?
//               </a>
//             </div>
//             <input
//               type="password"
//               name="password"
//               className="form-control rounded-3 border-light-subtle shadow-none py-2 px-3 text-secondary small"
//               placeholder="Enter Password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-dark btn-md w-100 py-2.5 rounded-pill fw-medium mb-3 shadow-none fs-6"
//           >
//             Sign In
//           </button>
//         </form>
//         <p className="text-center small text-secondary mt-2 mb-0">
//           New to pgHub?{" "}
//           <Link
//             to="/register"
//             className="text-decoration-none fw-semibold text-dark link-primary"
//           >
//             Create an account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/user";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser({ email, password });

    if (response.status === "success") {
      toast.success("Login successful");
      login(response.data);

      if (response.data.user.role === "TENANT") {
        navigate("/");
      } else if (response.data.user.role === "OWNER") {
        navigate("/owner");
      } else if (response.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      toast.error(
        response.error
          ? typeof response.error === "string"
            ? response.error
            : Object.values(response.error)[0]
          : "Something went wrong",
      );
    }
  };

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <div
        className="card bg-white border border-light-subtle rounded-4 shadow-sm p-4 p-md-5"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3
          className="fw-extrabold text-dark tracking-tight mb-1"
          style={{ letterSpacing: "-0.5px" }}
        >
          Welcome back
        </h3>

        <p className="text-muted small mb-4">
          Enter your credentials to access your pgHub account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary mb-1">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              className="form-control rounded-3 border-light-subtle shadow-none py-2 px-3 text-secondary small"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label small fw-semibold text-secondary m-0">
                Password
              </label>

              <a
                href="#forgot"
                className="text-decoration-none small text-muted link-dark"
                style={{ fontSize: "0.75rem" }}
              >
                Forgot?
              </a>
            </div>

            <input
              type="password"
              name="password"
              className="form-control rounded-3 border-light-subtle shadow-none py-2 px-3 text-secondary small"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-md w-100 py-2.5 rounded-pill fw-medium mb-3 shadow-none fs-6"
          >
            Sign In
          </button>
        </form>

        <p className="text-center small text-secondary mt-2 mb-0">
          New to pgHub?{" "}
          <Link
            to="/register"
            className="text-decoration-none fw-semibold text-dark link-primary"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;