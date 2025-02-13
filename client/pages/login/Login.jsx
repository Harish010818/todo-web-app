import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = ({userState, setUserState}) => {
   console.log(userState);
   const [user, setUser] = useState({
      email : "",
      password : ""      
   })
   
   const [isLogged, setIsLogged] = useState(false);
   const [userId, setUserId] = useState(null);

   const navigate = useNavigate();

   // it will handle changes on login page
    const changeHandler =(event) => {
         setUser({
              ...user, [event.target.name] : event.target.value // visit scrimba for while
         })  
   }
  
    // it will handle login 
    const loginHandler = async() => {
       
       try {
          const res = await axios.post(
             `${import.meta.env.VITE_API_URL}/api/user/login`,
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
               setUserId(res.data.user._id);

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

   }, [isLogged, navigate])
   
   return (         
        <div className="grid justify-center mt-10 space-y-4">
             <span className="font-bold text-2xl">User Login :</span>
             <input 
                value={user.email}
                name="email"
                onChange={changeHandler}  
                placeholder="Username or Email" 
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
                onClick={loginHandler} 
                className="w-52 bg-gray-400 px-2 py-2"
            >
          Login</button>
          <p>{"Don't have an account "} 
             <span className="text-blue-700 cursor-pointer" 
              onClick={() => navigate("/register")}
             >
            Sign up</span>
         </p>
      </div>
    )
}
