import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service";

const AuthContext = React.createContext();
const httpAuth = axios.create();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует"
          };
          throw errorObject;
        };
      };
    };
  };

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(
        `accounts:signInWithPassword`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
      setTokens(data);
    } catch (error) {
      errorCatcher(error);

      const { code, message } = error.response.data.error;

      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            throw new Error("Email или пароль введены некорректно");
          default:
            throw new Error(
              "Слишком много попыток входа. Попробуйте позже"
          );
        };
      };
    };
  };

  async function createUser(data) {
    try {
        const { content } = userService.create(data);
        setUser(content);
      } catch (error) {
        errorCatcher(error);
      }
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
