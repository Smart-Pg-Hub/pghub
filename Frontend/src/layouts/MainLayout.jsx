import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PgChatbot from "../components/PgChatbot";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="container-fluid p-0">
        <Outlet />
      </main>

      <Footer />
      <PgChatbot/>
    </>
  );
}

export default MainLayout;
