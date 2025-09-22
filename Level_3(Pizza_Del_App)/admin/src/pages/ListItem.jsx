import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListItem = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full px-4 sm:px-8">
      <h2 className="text-xl font-bold mb-4 mt-2 text-center">All Foods List</h2>

      {/* Table Header (only on md devices */}
      <div className="hidden md:grid grid-cols-5 gap-6 border p-3 rounded-lg font-semibold bg-gray-100">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>

      {list.map((item) => (
        <div
          key={item._id}
          className="md:grid md:grid-cols-5 gap-6 items-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm my-2
                     flex flex-col md:flex-none"
        >
          {/* Image */}
          <img
            src={`${url}/images/` + item.image}
            alt={item.name}
            className="w-16 h-16 rounded-md"
          />

          {/* Name */}
          <p className="md:text-left text-gray-800">
            <span className="md:hidden font-semibold">Name: </span>
            {item.name}
          </p>

          {/* Category */}
          <p className="md:text-left text-gray-800">
            <span className="md:hidden font-semibold">Category: </span>
            {item.category}
          </p>

          {/* Price */}
          <p className="md:text-left text-gray-800">
            <span className="md:hidden font-semibold">Price: </span>₹{item.price}
          </p>

          {/* Action */}
          <p onClick={() => removeFood(item._id)} className="text-red-600 cursor-pointer font-extrabold text-xl">X</p>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
