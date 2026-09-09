import React from "react";
import PropertyList from "./property/PropertyList";
import SerchBar from "../components/SerchBar";

const Home = () => {
  return (
    <div>
      <SerchBar />
      <PropertyList />
    </div>
  );
};

export default Home;
