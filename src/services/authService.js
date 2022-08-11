import http from "./httpService";
import apiUrl from "../config";

const apiEndPoint = apiUrl.apiUrl + "/auth/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt() {
  const jwt = localStorage.getItem(tokenKey);
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("loggedUser");
}

export async function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt;
  } catch (error) {
    return null;
  }
}

export async function getUserData() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = await http.get(apiUrl.apiUrl + "/auth/me", jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getUserData,
  getJwt,
};
