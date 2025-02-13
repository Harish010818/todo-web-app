import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

export const Main = () => {
  const {_id} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [updateTodoId, setUpdateTodoId] = useState(""); 
  const [todos, setTodos] = useState([]);

  //to add todo
  const addTodoHandler = async() => {
    console.log("jara hai")
    try {
         const res = await axios.post(
         `http://localhost:8000/api/todo/${ _id }`,
         {title, description},
         {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
         }
      );
     
      if(res){
        alert(res.data.message);
        setTodos([...todos, res.data.tododata]);
        setTitle("");
        setDescription("");
      } 
        
    } catch(err) {
       alert(err.response?.data?.message || "Something went wrong");
    }
 };

  //delete todo handler
  const deleteTodoHandler = async(id) => {
    try {
        await axios.delete(`http://localhost:8000/api/todo/${id}`, {
          withCredentials: true
       });

        setTodos(todos.filter(todo => todo._id !== id));
        alert("Todo deleted successfully!");
    } catch (err) {
        alert(err.response?.data?.message || "Error deleting todo");
    }
 };

// edit todo handler
 const invokeToEdit = (todo) => {
      setTitle(todo.title);
      setDescription(todo.description);
      setIsEditing(true);
      setUpdateTodoId(todo._id);     
 }

  const editTodoHandler=async(id) => {
      try {
          const res = await axios.put(
          `http://localhost:8000/api/todo/${id}`,
           {title, description},
          {
           headers: { "Content-Type": "application/json" },
           withCredentials: true,
          }
      );

        alert(res.data.message);
        setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, title, description } : todo
    ));
      } catch(err){
        alert(err.response?.data.message || "Something went wrong")
    }

   
    setTitle("");
    setDescription("");
    setIsEditing(false);
    setUpdateTodoId("");  
  };

 // to fetch and show all todos
 useEffect(() => {
      const fetchTodo = async () => {
            try {
               const res = await axios.get(`http://localhost:8000/api/todo/${_id}`)
               if(res){
                  const filtered = res.data.todos.filter((todo) => todo.userId == _id);
                  setTodos(filtered); // only active user todos will show  
              }       
            } catch(err){
              console.log(err);
            }       
      }
    
    fetchTodo(); 
  }, [])

  return (
    <main className="m-4 md:m-10">
    <div className="flex flex-row md:flex-row items-center gap-4">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add title here..."
        type="text"
        className="border-gray-400 border px-3 py-2 w-full md:w-auto max-w-md rounded-md"
      />

      <button
        onClick={() => (isEditing ? editTodoHandler(updateTodoId) : addTodoHandler())}
        className="bg-green-500 text-black font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
      >
          <span className="hidden sm:block">{isEditing ? "Update" : "Click to add"}</span>
          <span className="sm:hidden">{isEditing ? "Update" : "Save"}</span>
      </button>
    </div>

    <textarea
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      placeholder="Add description..."
      className="border-gray-400 border-2 px-3 py-2 w-full max-w-md mt-4 rounded-md"
    />

  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
  {todos.map((todo) => (
    <div
      key={todo._id}
      className="relative bg-gray-900 text-white px-6 py-8 border-2 border-white rounded-lg hover:bg-gray-700 transition-all"
    >
      <div className="flex gap-3 absolute top-2 right-2">
        <button onClick={() => invokeToEdit(todo)} className="hover:text-blue-400">
          <CiEdit />
        </button>
        <button onClick={() => deleteTodoHandler(todo._id)} className="hover:text-red-500">
          <FaRegTrashAlt className="text-red-400" />
        </button>
      </div>
      <span className="font-semibold block">{todo.title} :</span>
      <p className="font-light">{todo.description}</p>
    </div>
  ))}
 </div>
  </main>
  );
};
