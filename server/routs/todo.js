import express from "express";
import { createTodo, deleteTodo, getAlltodo, updateTodo } from "../controlers/todo.js";
import { isAuth } from "../middleware/isAuthenticated.js";
const todoRout = express.Router();

todoRout.route("/:_id")
        .post(isAuth, createTodo)
        .get(getAlltodo);
      
todoRout.route("/:_id")
      .put(isAuth, updateTodo)
      .delete(isAuth, deleteTodo);

export default todoRout;


