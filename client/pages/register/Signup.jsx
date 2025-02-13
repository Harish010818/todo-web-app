import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = ({setUserState}) => {
    const [user, setUser] = useState({
         username : "",
         email : "",
         password : ""      
    })
   
   const [isLogged, setIsLogged] = useState(false);
   const [userId, setUserId] = useState(null);
   
   const navigate = useNavigate();

   // it will handle changes on login page
   const changeHandler = (event) => {
         setUser({
             ...user, [event.target.name] : event.target.value // visit scrimba for while
        })  
  }
  
   // it will handle login 
   const signupHandler = async() => {
       try {
            const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/user/register`,
             user,
             {
               headers: { "Content-Type": "application/json" },
               withCredentials: true
             }
         );
          
         if(res){
            alert(res.data.message);
            setUserState(true);
            setIsLogged(true);
            setUserId(res.data.userData._id);
         }
         
      } 
      catch(err){
           alert(err.response.data.message);
      }
   } 
   
   useEffect(() => {
      if(isLogged){
         navigate(`/${userId}`); 
      } 
      
   }, [isLogged, navigate]); 

   return (         
        <div className="grid justify-center mt-10 space-y-4">
            <span className="font-bold text-2xl"> Sign up :</span>
             <input 
                value={user.username}
                name="username"
                onChange={changeHandler}  
                placeholder="Username" 
                type="text"
                className="border-gray-400 border px-2 py-2 w-52"
             />
             <input 
                value={user.email}
                name="email"
                onChange={changeHandler}  
                placeholder="Email" 
                type="text"
                className="border-gray-400 border px-2 py-2 w-52"
             />
             <input 
                value={user.password} 
                name="password"
                onChange={changeHandler}  
                placeholder="Password" 
                type="text"
                className="border-gray-400 border px-2 py-2 w-52"
            /> 
             <button 
                onClick={signupHandler} 
                className="w-52 bg-gray-400 px-2 py-2"
            >
          Sign up</button>
          <p>{"Already have an account "}  
             <span className="text-blue-700 cursor-pointer" 
              onClick={() => navigate("/login")}
             >Login</span>
         </p>
      </div>
    )
}
