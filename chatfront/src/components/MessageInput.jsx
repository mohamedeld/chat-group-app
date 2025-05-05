import { useState } from "react";

const MessageInput = ({handleSendMessage}) => {
        const [message,setMessage] = useState("")

        const handleSend = ()=>{
            handleSendMessage(message);
            setMessage("");
        }
    
  return (
    <>
        <input id="new-message" value={message} onChange={(e)=> setMessage(e.target.value)} className='border px-3 py-4 flex-1' placeholder='Enter your message'/>                <button id="send-message" className='bg-amber-600 text-white font-semibold px-6 py-3 rounded-md cursor-pointer hover:bg-amber-700' onClick={handleSend} type="submit">Send</button>
    </>
  )
}

export default MessageInput