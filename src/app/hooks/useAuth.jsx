import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = React.createContext();
const httpAuth = axios.create();

export const useAuth = () => {
  return useContext(AuthContext);
};

const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refrech-token';
const EXPIRES_KEY = 'jwt-expires';

const AuthProvider = ({ children }) => {
  function setTokens ({ idToken, refreshToken, expiresIn=3600}) {
    const expiresDate = new Date().getTime()+expiresIn*1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
  };

  async function signUp({ email, password}) {
    const key = "AIzaSyBwo-54zEdvhlaIZ3owwXqOdAv6Kx07dPA";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${key}`;
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    });
  };

  return (
    <AuthContext.Provider value={{signUp}}>
      {children}
    </AuthContext.Provider>
  )

};
