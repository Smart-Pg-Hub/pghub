import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPg } from "../services/property";
import { FaSearch } from "react-icons/fa";

function SerchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    name: "",
    city: "",
    type: "",
  });

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await searchPg(search);

      console.log("Search results:", res.data);

      navigate("/home", {
        state: {
          searchResults: res.data,
        },
      });
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div
      className="bg-white border-bottom"
      style={{
        position: "sticky",
        top: "0",
        zIndex: 1020,
      }}
    >
      <div className="py-3 d-flex justify-content-center">
        <form
          onSubmit={handleSearch}
          className="d-flex align-items-center bg-white shadow-sm rounded-3 border p-2"
          style={{
            width: "700px",
            maxWidth: "90%",
          }}
        >
          <input
            type="text"
            name="name"
            value={search.name}
            onChange={handleChange}
            placeholder="Search PG name"
            className="form-control border-0 shadow-none"
          />

          <input
            type="text"
            name="city"
            value={search.city}
            onChange={handleChange}
            placeholder="City"
            className="form-control border-0 shadow-none"
          />

          <select
            name="type"
            value={search.type}
            onChange={handleChange}
            className="form-select border-0 shadow-none"
          >
            <option value="">Type</option>
            <option value="BOYS">Boys</option>
            <option value="GIRLS">Girls</option>
            <option value="CO_LIVING">Co-Living</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center justify-content-center"
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SerchBar;
