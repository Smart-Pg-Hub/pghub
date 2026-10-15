import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProperties } from "../../services/property";
import PropertyCard from "../../components/property/PropertyCard";

const PropertyList = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);

  const loadProperties = async () => {
    const result = await getAllProperties();
    if (result.status === "success") {
      setProperties(result.data);
    }
  };

  useEffect(() => {
    if (location.state?.searchResults) {
      setProperties(location.state.searchResults);
    } else {
      loadProperties();
    }
  }, [location.state]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Available PGs</h2>

      <div className="row">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
