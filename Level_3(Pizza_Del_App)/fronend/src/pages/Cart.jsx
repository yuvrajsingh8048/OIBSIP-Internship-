import React, { useState, useEffect } from "react";
import { usePizza } from "../context/StoreContext";
import { IoMdRemoveCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, totalPrice } = usePizza();

  const [deliveryFee, setDeliveryFee] = useState(0);

  // Update delivery fee
  useEffect(() => {
    if (cart.length === 0) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(40);
    }
  }, [cart]);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-red-600">🛒 Your Cart</h2>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          {cart.map((pizzaItem, pizzaIndex) => (
            <div
              key={pizzaIndex}
              className="border-b border-gray-300 py-6 mb-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  🍕 Custom Pizza #{pizzaIndex + 1}
                </h3>
                <button
                  onClick={() => removeFromCart(pizzaItem._id)}
                  className="text-red-700 text-2xl hover:scale-110 transition"
                >
                  <IoMdRemoveCircle />
                </button>
              </div>

              <div className="pl-4 text-sm text-gray-700">
                <p>
                  <strong>Base:</strong> {pizzaItem.base?.name || "None"}
                </p>
                <p>
                  <strong>Sauce:</strong> {pizzaItem.sauce?.name || "None"}
                </p>
                <p>
                  <strong>Cheese:</strong>{" "}
                  {pizzaItem.cheese?.length
                    ? pizzaItem.cheese.map((c) => c.name).join(", ")
                    : "None"}
                </p>
                <p>
                  <strong>Veggies:</strong>{" "}
                  {pizzaItem.veggies?.length
                    ? pizzaItem.veggies.map((v) => v.name).join(", ")
                    : "None"}
                </p>
              </div>

              <p className="text-red-600 font-bold mt-2">₹{pizzaItem.total}</p>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="flex justify-between pt-8 flex-col md:flex-row gap-8">
            {/* Totals */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold my-4">Cart Total</h2>
              <div className="flex justify-between my-1">
                <p>Subtotal</p>
                <p className="font-semibold">₹{totalPrice}</p>
              </div>
              <div className="flex justify-between my-1">
                <p>Delivery Fee</p>
                <p className="font-semibold">₹{deliveryFee}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between my-1 text-lg font-bold text-red-700">
                <p>Total Amount</p>
                <p>₹{totalPrice + deliveryFee}</p>
              </div>
              <Link to="/order">
                <button className="mt-6 uppercase bg-red-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-800 transition">
                  Proceed To Checkout
                </button>
              </Link>
            </div>

            {/* Promo Code */}
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 text-[15px] font-medium">
                If you have a promo code, enter it here:
              </p>
              <div className="flex mt-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-[70%] px-4 py-2 rounded-tl-lg rounded-bl-lg bg-gray-200 focus:outline-none"
                />
                <button className="w-[30%] rounded-tr-lg rounded-br-lg py-2 bg-black text-white font-medium hover:bg-gray-800 transition">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
