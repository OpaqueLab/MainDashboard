import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RouteGuard = ({ children }) => {
  const permissionToken = useSelector(
    (state) => state?.user?.user_info?.data?.access_token
  );
  // console.log(permissionToken);
  useEffect(() => {
    // Cookies.set("token", permissionToken);
    // Function to refresh the token
    const refreshToken = async () => {
      try {
        const response = await axios.get(

          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(response);
        const newToken = response?.data?.data?.access_token;
        // console.log(newToken)
        if (newToken) {
          Cookies.set("token", newToken);
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    };

    if (permissionToken) {
      refreshToken();
    }
  }, []);

  if (permissionToken) return children;
  else return <Navigate to="/login" />; 
  // select-user
};

export default RouteGuard;
