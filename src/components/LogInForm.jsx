import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { collectInfo } from "../Global/Slice/AuthSlice";

const LogInForm = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null); // State variable for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      const token = response?.data?.data?.access_token;

      dispatch(collectInfo(response?.data));
      // console.log(response?.data)

      // console.log(token)

      if (response?.data?.data?.access_token) {
        Cookies.set("token", token);
        nav("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("*Invalid username or password");
    }
  };

  return (
    <div className="p-10 bg-primary rounded-md min-w-[400px]">
      <h1 className="text-2xl text-white text-center mb-5">Blog Management</h1>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-white font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="pl-3 py-3 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-white font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-3 py-3 rounded-md outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-white font-semibold text-center py-3 rounded-md hover:bg-secondary/60"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
