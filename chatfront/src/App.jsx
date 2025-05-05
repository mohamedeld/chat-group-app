
import { useCallback, useState } from 'react';
import './App.css'
import MessageInput from './components/MessageInput';
import socket from './socket';
function App() {
    const [messages,setMessages] = useState([]);

    const handleSendMessage = useCallback((message)=>{
        if(message.trim() === "") return;
        const newMessage = {
            id:crypto.randomUUID(),
            message,
            sender:"You",
            timestamp:new Date().getTime()
        }
        setMessages(prev => [...prev,newMessage]);
    },[])
    console.log("selcome")
  return (
    <div className='p-3'>
        <div className="flex flex-col h-screen gap-3">
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
        </div>
    </div>
  )
}

export default App
