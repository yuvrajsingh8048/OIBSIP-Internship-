import React, { useState } from "react";
import { usePizza } from "../context/StoreContext";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const { cart, totalPrice } = usePizza();
  const [deliveryFee, setDeliveryFee] = useState(() => {
    if (cart.length == 0) return 0;
    return 40;
  });
  return (
    <div className="w-full min-h-screen lg:flex justify-evenly mt-20 px-8">
      <div>
        <h2 className="text-black font-bold text-2xl">Delivery Information</h2>

        <div className=" mt-8">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First name"
              className="border border-gray-300 rounded px-2 py-1 mb-3"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border border-gray-300 rounded px-2 py-1 mb-3"
            />
          </div>
         <div className="flex gap-3">
           <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded px-2 py-1 mb-3"
          />
          <input
            type="text"
            placeholder="Street"
            className="border border-gray-300 rounded px-2 py-1 mb-3"
          />
         </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded px-2 py-1 mb-3"
            />
            <input
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded px-2 py-1 mb-3"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Zip Code"
              className="border border-gray-300 rounded px-2 py-1 mb-3"
            />
            <input
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded px-2 py-1 mb-3"
            />
          </div>
          <input
            type="number"
            placeholder="Phone"
            className="border border-gray-300 rounded px-2 py-1 mb-3"
          />
        </div>
      </div>

      <div className="sm:mt-10 lg:mt-0">
        <h2 className="text-2xl font-semibold my-4">Cart Total</h2>
        <div className="flex justify-between my-1">
          <p>SubTotal</p>
          <p className="font-semibold">&#8377; {totalPrice}</p>
        </div>
        <hr />
        <div className="flex justify-between my-1">
          <p>Delivery Fee</p>
          <p className="font-semibold">&#8377; {deliveryFee}</p>
        </div>
        <hr />
        <div className="flex justify-between my-1">
          <p>Total Amount</p>
          <p className="font-semibold">&#8377; {totalPrice + deliveryFee}</p>
        </div>
        <Link to="/payment">
          <button className="my-4 uppercase bg-red-700 text-white font-semibold px-6 py-1">
            Proceed To Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceOrder;
