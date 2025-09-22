import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import ListItem from "./pages/ListItem";
import Orders from "./pages/Orders";

import { ToastContainer } from 'react-toastify';

const App = () => {

  const url = "http://localhost:4000"
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <hr />
      <div className="flex">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add  url={url}/>} />
          <Route path="/list" element={<ListItem  url={url}/>} />
          <Route path="/order" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
