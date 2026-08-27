import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyHeader from "./PropertyHeader";
import { getPropertyById } from "../../services/property";

const PropertySummary = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    const result = await getPropertyById(id);

    if (result.status === "success") {
      setProperty(result.data);
    }
  };

  if (!property) {
    return <h5 className="text-center mt-5">Loading...</h5>;
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Property Summary</h5>
      </div>

      <PropertyHeader property={property} />
    </div>
  );
};

export default PropertySummary;
