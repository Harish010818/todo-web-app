import express from "express";
import { login, logout, register } from "../controlers/user.js";

const userRout = express.Router();
userRout.route("/register").post(register);
userRout.route("/login").post(login);
userRout.route("/logout").get(logout);


export default userRout;

