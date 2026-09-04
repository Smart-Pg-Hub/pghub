import PropertyTabs from "../../components/property/PropertyTabs";
import DashboardCards from "../../components/property/DashboardCards";
import PropertyInfo from "../../components/property/PropertyInfo";
import { Outlet, useParams } from "react-router-dom";
import { getPropertyById } from "../../services/property";
import { useEffect, useState } from "react";

const ManageProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const getProperty = async () => {
    const response = await getPropertyById(id);

    if (response.status === "success") {
      setProperty(response.data);
    } else {
    }
  };

  useEffect(() => {
    getProperty();
  }, [id]);

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        <PropertyInfo property={property} />
        <PropertyTabs />
        <Outlet />
      </div>
    </div>
  );
};

export default ManageProperty;
