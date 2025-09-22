import React, { useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { usePizza } from "../context/StoreContext";
import { useEffect } from "react";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = usePizza();
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Give message when input field have wrong credential
  const [warning, setWarning] = useState("");
  useEffect(() => {
    setWarning("")
  }, [data])

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      setWarning(response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-svh z-50 flex justify-center items-center bg-black bg-opacity-50">
      <form
        onSubmit={onLogin}
        action=""
        className="bg-white rounded-xl shadow-xl p-8 relative"
      >
        <div className="flex w-full">
          <h2 className="w-full text-center text-black text-2xl font-semibold">
            {currState}
          </h2>
          <div
            className="absolute right-5 bg-red-500 rounded-full cursor-pointer text-white font-medium p-2"
            onClick={() => setShowLogin(false)}
          >
            <RxCross2 />
          </div>
        </div>
        <div className="flex flex-col">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Your name"
              required
              onChange={onChangeHandler}
              className="px-4 py-2 outline-none mt-4 text-sm focus-within:border focus-within:border-red-700 rounded-full"
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Your email"
            required
            onChange={onChangeHandler}
            className="px-4 py-2 outline-none my-4 text-sm focus-within:border focus-within:border-red-700 rounded-full"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            required
            onChange={onChangeHandler}
            className="px-4 py-2 outline-none mb-4 text-sm focus-within:border focus-within:border-red-700 rounded-full"
          />
        </div>
        <p className="text-red-700 text-sm text-center mb-2">{warning}</p>
        <button
          type="submit"
          className="w-full flex mb-4 bg-red-700 font-medium  rounded-sm text-white px-8 py-2 justify-center"
        >
          {currState === "Login" ? "Login" : "Create new account"}
        </button>
        <div>
          <label className="text-sm text-gray-500">
            <input
              type="checkbox"
              name=""
              id=""
              className="h-3 w-3 mr-2"
              required
            />
            By Continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>
        <div className="w-full py-2 text-center mt-2 rounded-full text-black font-medium ">
          {currState === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-red-700 cursor-pointer"
                onClick={() => setCurrState("Login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                className="text-red-700 cursor-pointer"
                onClick={() => setCurrState("Sign Up")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
