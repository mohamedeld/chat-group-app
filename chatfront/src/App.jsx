
import { useCallback, useEffect, useState } from 'react';
import './App.css'
import MessageInput from './components/MessageInput';
import socket from './socket';
import {v4 as uuid} from "uuid";
import useAuth from './hooks/useAuth';
import EmailForm from './EmailForm';

function App() {
    const [messages,setMessages] = useState([]);
    const [chatId,setChatId] = useState("");
    const [token,setToken] = useState("");
    const {isLoggedIn} = useAuth();
    const generateChatId = ()=>{
        const chatId =uuid();
        window.history.pushState(null, '', `/?chatId=${chatId}`); // Update the URL without reloading
        setChatId(chatId);
    }


    useEffect(()=>{ 
        const tokenData = JSON.parse(localStorage.getItem("user"));
        setToken(tokenData?.token);
        const urlParams = new URLSearchParams(window.location.search);
        const chatId = urlParams.get("chatId");
        setChatId(chatId);
        socket.emit("join",chatId)
    },[])
    const handleSendMessage = useCallback((message)=>{
        if(message.trim() === "") return;
        const newMessage = {
            id:crypto.randomUUID(),
            message,
            chatId,
            sender:"You",
            timestamp:new Date().getTime()
        }
        socket.emit("message",{
            token,
            message:newMessage});
    },[chatId,token])

    useEffect(()=>{
        const handleMessage = (message)=>{
            setMessages(prev => [...prev,message]);
        }
        socket.on("message",handleMessage)
        return ()=>{
            socket.off("message", handleMessage);
        }
    },[])
  return (
    <div className='p-3'>
        {
            isLoggedIn ? 
        <div className="flex flex-col h-screen gap-3">
            <div className='flex justify-end'>
            <button className='w-fit  bg-amber-500 text-white font-semibold cursor-pointer py-3 px-8 rounded-md hover:bg-amber-600' onClick={generateChatId}>New Chat</button>
            </div>
            <div className="flex-1 overflow-auto p-4">
                {messages?.map((msg,index) => (
                    <div key={index} className={`flex gap-2 ${msg?.sender === "You" ? "justify-end" : ""}`}>
                        <div className={`rounded-lg p-3 ${msg?.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} mb-2`}>
                            <p>{msg?.message}</p>
                            <span className='text-xs text-gray-300'>{new Date(msg?.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div  className="my-5 flex items-center gap-1">
                <MessageInput handleSendMessage={handleSendMessage}/>
            </div>
        </div>: (
            <EmailForm/>
        )
        }
    </div>
  )
}

export default App
