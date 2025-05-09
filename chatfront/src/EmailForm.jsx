import { useState } from "react"
import socket from "./socket";
import { useEffect } from "react";

const EmailForm = () => {
    const [email,setEmail] = useState('');
    const handleLogin = async ()=>{
        try{
            if(!email || !email.includes("@") || !email.includes(".")){
                return;
            }
            socket.emit("login",email);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        socket.on("userCreated",data=>{
            console.log("first",data)
            localStorage.setItem("user",JSON.stringify(data))
        })
    },[socket])
  return (
    <div className="flex flex-col gap-5 max-w-xl mx-auto h-screen justify-center ">
        <label>Email</label>
        <input type="email" placeholder="enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} className="p-2 border-blue-400 border-[1px] border-solid focus:border-blue-500 rounded-md"/>
        <button className="bg-blue-400 text-white p-2 px-4 rounded-md cursor-pointer hover:bg-blue-500" onClick={handleLogin}>Login</button>
    </div>
  )
}

export default EmailForm