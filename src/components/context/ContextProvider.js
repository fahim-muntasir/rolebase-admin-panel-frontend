import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const UseContext = () => {
  return useContext(Context);
};

export default function ContextProvider({ children }) {
  const [isLogin, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    axios({
      method: "POST",
      url: "http://localhost:5000/api/login/check",
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.login) {
          setCurrentUser(response.data.userData);
          setLogin(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  const login = (data, cd) => {
    axios({
      url: "http://localhost:5000/api/login/",
      method: "POST",
      data: data,
      withCredentials: true,
    })
      .then((response) => {
        setLogin(true);
        setCurrentUser(response.data.userData);
        cd(response);
        setLoading(false);
      })
      .catch(({ response }) => {
        cd(response);
        setLoading(false);
      });
  };

  const logout = (cd) => {
    axios({
      url: "http://localhost:5000/api/logout/",
      method: "DELETE",
      withCredentials: true,
    })
      .then((response) => {
        setTimeout(() => {
          setLogin(false);
          cd(response);
        }, 1000);
      })
      .catch((e) => cd(e));
  };

  const value = {
    isLogin,
    login,
    checkLogin,
    currentUser,
    logout,
  };

  return (
    <Context.Provider value={value}>{!loading && children}</Context.Provider>
  );
}
