import React from "react";
import assest from "../assets/assest";

const Header = () => {
  return (
    <div className="w-full bg-white">
      {/* Top Gradient Section */}
      <div className="bg-gradient-to-b from-red-200 to-red-50">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl uppercase font-extrabold text-red-500 text-center py-16 px-4">
          Making Pizza & <br className="hidden md:block" /> Spreading Smiles
        </h1>

        {/* Decorative Line */}
        <div className="h-1 w-full bg-red-200 my-6 md:my-10"></div>
      </div>

      {/* Bottom Section (Text + Image + Button) */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-10 py-6 gap-6">
        {/* Text */}
        <p className="text-base sm:text-lg font-normal text-gray-800 text-center md:text-left md:ml-6">
          Order online and enjoy fresh, hot pizza with just one{" "}
          <br className="hidden sm:block" />
          tap. Because great pizza shouldn't make you wait.
        </p>

        {/* Image */}
        <img
          src={assest.header}
          alt="Header"
          className="h-[200px] sm:h-[250px] hover:rotate-6 transition-transform duration-300 cursor-pointer"
        />

        {/* Button */}
        <button className="bg-transparent border border-red-700 text-red-500 px-6 py-2 hover:bg-red-700 hover:text-white hover:border-black font-semibold rounded-full transition duration-300 md:mr-6">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
