import { v4 as uuidv4 } from "uuid";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

const addToCart = async (req, res) => {
  const { userId, pizza } = req.body;
  try {
    // Check user login authentication
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const newPizza = {
      ...pizza,
      _id: uuidv4()
    }

    user.cartData.push(newPizza)
    user.markModified('cartData')
    await user.save()

    res.json({
      success: true,
      message: "Item added to cart",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.json({ success: false, message: "Error!" });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.cartData = user.cartData.filter((item) => item._id !== itemId)
    user.markModified('cartData')
    await user.save()

    res.json({
      success: true,
      message: "Item removed from cart",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.json({ success: false, message: "Error!" });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("Get cart error:", error);
    res.json({ success: false, message: "Error!" });
  }
};

export { addToCart, removeFromCart, getCart };
