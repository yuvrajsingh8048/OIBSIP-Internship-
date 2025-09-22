import React from "react";
import Header from "../components/Header";
import PizzaItem from "../components/PizzaItem";
import Footer from "../components/Footer";
import MobileApp from "../components/MobileApp";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <PizzaItem />
      <MobileApp />
      <Footer />
      <Outlet />
    </div>
  );
};

export default Home;
