import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [baseList, setBaseList] = useState([]);
  const [cheeseList, setCheeseList] = useState([]);
  const [sauceList, setSauceList] = useState([]);
  const [veggiesList, setVeggiesList] = useState([]);

  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState([]);
  const [selectedVegies, setSelectedVegies] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [token, setToken] = useState("");

  const url = "http://localhost:4000";

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      const data = response.data.data;

      // Prepend full image path
      const updatedData = data.map((item) => ({
        ...item,
        image: `${url}/images/${item.image}`, // adjust route if needed (/api/images vs /images)
      }));

      setBaseList(updatedData.filter((item) => item.category === "Base"));
      setSauceList(updatedData.filter((item) => item.category === "Sauce"));
      setCheeseList(updatedData.filter((item) => item.category === "Cheese"));
      setVeggiesList(updatedData.filter((item) => item.category === "Vegies"));
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    fetchFoodList();
  }, []);

  const addToCart = async (pizza) => {
    setCart((prev) => [...prev, pizza]);
    if(!token){
      alert('Please login to add items')
      return
    }
    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { pizza },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCart(response.data.cartData);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const removeFromCart = async (pizzaId) => {
    console.log(pizzaId);
    try {
      const response = await axios.post(
        `${url}/api/cart/remove`,
        {
          itemId: pizzaId,
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCart(response.data.cartData);
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCart(response.data.cartData);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const totalPrice = cart.reduce((sum, item) => sum + (item.total || 0), 0);

  const contextValue = {
    baseList,
    sauceList,
    cheeseList,
    veggiesList,
    url,
    token,
    setToken,

    selectedBase,
    setSelectedBase,
    selectedSauce,
    setSelectedSauce,
    selectedCheese,
    setSelectedCheese,
    selectedVegies,
    setSelectedVegies,
    cart,
    addToCart,
    removeFromCart,
    totalPrice,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const usePizza = () => useContext(StoreContext);

export default StoreContextProvider;
