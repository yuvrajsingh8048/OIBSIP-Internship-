import React from "react";
import assest from "../assets/assest";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer id="contact-us" className="bg-gray-700 text-gray-200 px-6 py-12">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Footer Left */}
        <div className="flex flex-col items-center md:items-start">
          <img src={assest.logo} alt="logo" className="w-[150px] cursor-pointer"/>
          <p className="text-sm leading-relaxed mb-4 max-w-sm">
            At Pizza Point, we're all about delivering happiness—one slice at a
            time. Whether you're craving a classic Margherita or building your
            own masterpiece, we serve up fresh ingredients, bold flavors, and
            fast delivery. Your perfect pizza is just a point away.
          </p>
          <div className="flex gap-4 text-xl mt-4">
            {[FaFacebook, FaInstagram, FaLinkedin, FaXTwitter].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="border border-gray-500 rounded-full p-2 hover:bg-red-500 hover:text-white transition"
                >
                  <Icon />
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer Center */}
        <div className="flex flex-col lg:ml-20 items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 underline underline-offset-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-gray-200 cursor-pointer">Home</li>
            <li className="hover:text-gray-200 cursor-pointer">About</li>
            <li className="hover:text-gray-200 cursor-pointer">Delivery</li>
            <li className="hover:text-gray-200 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Footer Right */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 underline underline-offset-4">
            Get In Touch
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="tel:+916290668486" className="hover:text-gray-200">
                📞 +91 6290668486
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@pizzapoint.com"
                className="hover:text-gray-200"
              >
                ✉️ contact@pizzapoint.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <hr className="my-8 border-gray-600" />
      <p className="text-center text-xs text-gray-400">
        Copyright &copy; {new Date().getFullYear()} Pizza Point.com — All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;
