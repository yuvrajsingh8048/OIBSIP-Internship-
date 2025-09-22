import React from "react";
import assest from "../assets/assest";

const MobileApp = () => {
  return (
    <div
      id="mobile-app"
      className="w-full flex flex-col text-center  my-10 items-center"
    >
      <h2 className="text-4xl font-medium ">
        For better Experience Download <br /> Pizza Point App
      </h2>
      <div className="flex gap-4 mt-5 mb-10 p-4">
        <div className="">
          <img src={assest.play_store} alt=""/>
        </div>
        <div>
          <img src={assest.app_store} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
