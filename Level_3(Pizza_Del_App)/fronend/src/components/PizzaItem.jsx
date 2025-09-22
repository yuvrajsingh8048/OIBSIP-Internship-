import React, { useState } from "react";
import assest from "../assets/assest";
import { usePizza } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PizzaItem = () => {
  const navigate = useNavigate();
  const {
    baseList,
    sauceList,
    cheeseList,
    veggiesList,
    selectedBase,
    setSelectedBase,
    selectedSauce,
    setSelectedSauce,
    selectedCheese,
    setSelectedCheese,
    selectedVegies,
    setSelectedVegies,
    addToCart,
  } = usePizza();

  // Handlers for multi-select items
  const handleCheeseChange = (index) => {
    setSelectedCheese((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleVegiesChange = (index) => {
    setSelectedVegies((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const [showSuccess, setShowSuccess] = useState(false);

  // Compute selected items
  const base = selectedBase !== null ? baseList[selectedBase] : null;
  const sauce = selectedSauce !== null ? sauceList[selectedSauce] : null;
  const cheese = selectedCheese.map((i) => cheeseList[i]);
  const veggies = selectedVegies.map((i) => veggiesList[i]);

  // Total calculation
  const total =
    (base?.price || 0) +
    (sauce?.price || 0) +
    cheese.reduce((sum, item) => sum + item.price, 0) +
    veggies.reduce((sum, item) => sum + item.price, 0);

  // Loading state before API fetch completes
  if (
    !baseList.length ||
    !sauceList.length ||
    !cheeseList.length ||
    !veggiesList.length
  ) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-lg text-gray-600 animate-pulse">Loading menu...</p>
      </div>
    );
  }

  return (
    <div id="menu" className="w-full px-6 py-10 bg-red-100">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
        Explore our Menu
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center md:-mt-16">
        <p className="text-gray-700 mb-8 max-w-3xl">
          Craving something truly yours? Start with your favourite base, add a
          sauce that sets the mood, pick the cheese that melts your heart, and
          top it off with as many fresh veggies as you like. Whether you love a
          classic thin crust or a cheesy stuffed edge, our custom pizza builder
          lets you create the perfect slice every time. Your pizza, your rules.
          🍕
        </p>
        <img src={assest.menu_main} alt="menu" className="h-[300px]" />
      </div>

      {/* Base Section */}
      <Section title="Choose Base">
        {baseList.map((item, index) => (
          <Card
            key={index}
            item={item}
            selected={selectedBase === index}
            onClick={() => setSelectedBase(index)}
          />
        ))}
      </Section>

      {/* Sauce Section */}
      <Section title="Choose Sauce">
        {sauceList.map((item, index) => (
          <Card
            key={index}
            item={item}
            selected={selectedSauce === index}
            onClick={() => setSelectedSauce(index)}
          />
        ))}
      </Section>

      {/* Cheese Section */}
      <Section title="Choose Cheese">
        {cheeseList.map((item, index) => (
          <Card
            key={index}
            item={item}
            selected={selectedCheese.includes(index)}
            onClick={() => handleCheeseChange(index)}
          />
        ))}
      </Section>

      {/* Veggies Section */}
      <Section title="Choose Veggies">
        {veggiesList.map((item, index) => (
          <Card
            key={index}
            item={item}
            selected={selectedVegies.includes(index)}
            onClick={() => handleVegiesChange(index)}
          />
        ))}
      </Section>

      {/* Order Summary */}
      <div className="w-full max-w-2xl mx-auto mt-10 bg-white shadow-xl p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Your Order
        </h2>
        <p>
          <strong>Base:</strong> {base ? base.name : "None"}
        </p>
        <p>
          <strong>Sauce:</strong> {sauce ? sauce.name : "None"}
        </p>
        <p>
          <strong>Cheese:</strong>{" "}
          {cheese.length > 0 ? cheese.map((c) => c.name).join(", ") : "None"}
        </p>
        <p>
          <strong>Veggies:</strong>{" "}
          {veggies.length > 0 ? veggies.map((v) => v.name).join(", ") : "None"}
        </p>
        <p className="mt-2 font-bold text-lg text-red-700">Total: ₹{total}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="text-center mt-6">
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          onClick={() => {
            if (!base || !sauce) {
              alert("Please select at least a base and a sauce.");
              return;
            }

            const customPizza = {
              base,
              sauce,
              cheese,
              veggies,
              total:
                (base?.price || 0) +
                (sauce?.price || 0) +
                cheese.reduce((sum, item) => sum + item.price, 0) +
                veggies.reduce((sum, item) => sum + item.price, 0),
            };

            addToCart(customPizza);

            // Reset selections
            setSelectedBase(null);
            setSelectedSauce(null);
            setSelectedCheese([]);
            setSelectedVegies([]);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <p className="w-full text-center text-green-600 text-lg mt-4 font-medium">
          ✅ Pizza added to cart successfully!{" "}
          <span
            onClick={() => navigate("/cart")}
            className="underline underline-offset-2 cursor-pointer"
          >
            Click me to go to Cart
          </span>
        </p>
      )}
    </div>
  );
};

/* ===== Reusable Components ===== */
const Section = ({ title, children }) => (
  <div className="w-full mx-auto mt-10">
    <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
      {title}
    </h2>
    <div className="flex flex-wrap p-8 justify-center gap-4 bg-red-50 rounded-md shadow-xl">
      {children}
    </div>
  </div>
);

const Card = ({ item, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`max-h-[250px] w-[200px] bg-white p-4 rounded-xl cursor-pointer ${
      selected ? "border-2 border-red-700" : ""
    } hover:shadow-xl transition-all duration-200`}
  >
    <img
      src={item.image}
      alt={item.name}
      className="h-[100px] mx-auto rounded-full"
    />
    <div>
      <h2 className="text-lg font-medium">{item.name}</h2>
      <p className="text-xs text-gray-600 mb-1">{item.description}</p>
      <h3 className="text-red-700 font-bold text-base">₹{item.price}</h3>
    </div>
  </div>
);

export default PizzaItem;
