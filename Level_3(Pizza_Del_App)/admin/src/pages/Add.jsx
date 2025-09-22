import React, { useState } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Base",
  });

  const onChangeHandler = (event) => {
    const name  = event.target.name;
    const value = event.target.value
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);
    
    if(!image){
      console.log(test);
      
    } 

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Base",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-2xl p-6 ml-4 rounded-lg"
    >
      {/* Upload Image */}
      <div className="mb-6">
        <h2 className="font-semibold">Upload Image</h2>
        <label htmlFor="image-upload">
          <img
            src={image ? URL.createObjectURL(image) : assets.image}
            alt="Preview"
            className="w-28 sm:w-32 md:w-40 cursor-pointer mt-2 rounded-md border"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image-upload"
          hidden
          required
        />
      </div>

      {/* Product Name */}
      <div className="mb-4">
        <h2 className="font-semibold">Product Name</h2>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="Type here"
          onChange={onChangeHandler}
          className="w-full border border-gray-600 rounded-md px-4 py-2 mt-2"
          required
        />
      </div>

      {/* Product Description */}
      <div className="mb-4">
        <h2 className="font-semibold">Product Description</h2>
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Type here"
          rows="3"
          className="w-full border border-gray-600 rounded-md px-4 py-2 mt-2 resize-none"
          required
        />
      </div>

      {/* Category & Price */}
      <div className="flex flex-col sm:flex-row gap-6 mb-4">
        {/* Category */}
        <div className="flex-1">
          <h2 className="font-semibold">Product Category</h2>
          <select
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mt-2"
            required
          >
            <option value="Base">Base</option>
            <option value="Sauce">Sauce</option>
            <option value="Cheese">Cheese</option>
            <option value="Vegies">Vegies</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex-1">
          <h2 className="font-semibold">Product Price</h2>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full sm:w-[150px] bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
