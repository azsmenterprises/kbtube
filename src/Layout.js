import React from "react";
import Header from './Components/Header';
import { Outlet } from "react-router-dom";

const Layout = ({ userData }) => {
  return (
    <div>
      <Header userData={userData} />
      <main className='main'>
        <Outlet /> {/* Nested routes will be rendered here */}
      </main>

    </div>
  );
};

export default Layout;