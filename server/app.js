import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/database.js";

import userRout from "./routs/user.js";
import todoRout from "./routs/todo.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import cors from "cors"

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use("/api/user", userRout);
app.use("/api/todo", todoRout);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listen at port ${PORT}`);
})