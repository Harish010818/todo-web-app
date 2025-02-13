import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({userState , setUserState}) => { 

const [isLogged, setIsLogged] = useState(true); // used local state to track and handle globalstate 
const navigate = useNavigate();

//it will handle logout
const logoutHandler = async () => {
     try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
            withCredentials: true,  // Ye zaroori hai taki cookie backend tak jaye
        })
        
      if(res){
          alert(res.data.message);
          setUserState(false);
          setIsLogged(false); 
        }
        
    } catch(err){
        console.error(err.response.data.message);
    }            
}

 useEffect(() => {
    if(!isLogged){
        navigate("/login");
     }  

 }, [isLogged, navigate])

    return (         
        <nav className="bg-gray-500 text-white py-4 px-6">
  <div className="container mx-auto flex items-center justify-between">
    <h1 className="text-xl sm:text-3xl font-bold uppercase">Taskify 🚀</h1>
    <button
      onClick={() => (userState ? logoutHandler() : navigate("/register"))}
      className="bg-black text-sm sm:text-base px-2 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-400 transition-all"
    >
      {userState ? "Logout" : "Sign in"}
    </button>
  </div>
</nav>

    )
}
