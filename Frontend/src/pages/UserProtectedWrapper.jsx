import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const {setuser ,URL } = useContext(UserDataContext);

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) navigate("/captain/login");
    async function checkAuthorization() {
      try {
        const response = await axios.get(`${URL}/profile`, {
          headers: {
            authorization: token,
          },
        });

        setuser(response.data)
      } catch (err) {
        console.log("Error in authorization ");
        navigate("/user/login");
        localStorage.removeItem("token");
      }
    }
    checkAuthorization();
  }, []);

  return <div>{children}</div>;
};

export default UserProtectedWrapper;
