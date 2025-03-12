'use client'
import Image from "next/image";
import { MessageType } from "../../../../types/message-type";
import { ComponentPropsWithRef, forwardRef, useEffect, useState } from "react";
import { ChatTypingIndicator } from "./chat-type-indicator";

interface ChatMesageType extends ComponentPropsWithRef<'div'> {
    message: MessageType
 }
const chatToUrl = {
    chatbot: require('./assets/avatar1.png'),
    user: require('./assets/avatar2.png')
}

const ChatMessageMap = {
    chatbot:  ChatBotMessage,
    user: ChatUserMessage
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMesageType>(({ message }, ref) => {
    const MessageComponent = ChatMessageMap[message.sender];
  
    return (
      <div ref={ref} className="w-full">
        <MessageComponent message={message} />
      </div>
    );
  });


function ChatBotMessage({message}: ChatMesageType){
  const [isTyping, setIsTyping] = useState(message.isTyping);

  useEffect(() => {
    const startTyping = () => {
      const hideTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 6000);

      return () => clearTimeout(hideTimeout);
    };
    startTyping();
  }, []); 



    return<div className="w-full flex items-center gap-3 justify-start">
         <div className="size-[3rem] relative">
               <Image src={chatToUrl.chatbot} alt="chatbot" fill className="size-full"  />
         </div> 
         <div className=" rounded-tl-3xl rounded-tr-3xl  rounded-br-3xl rounded-bl-lg  bg-secondary-300 p-4">
         {isTyping ?
          <ChatTypingIndicator duration={5000} />:
          <p className="text-label-500">{message.text}</p>
        } 
            
         </div>
    </div>
}

function ChatUserMessage({message}: ChatMesageType){

    return<div className="w-full flex items-center gap-3 justify-end">
          <div className="rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-lg bg-secondary-300 p-4">
         <p className="text-label-500">{message.text}</p>
         </div>
         <div className="size-[3rem] relative">
               <Image src={chatToUrl.user} alt="chatbot" fill className="size-full"  />
         </div> 
       
    </div>
}

ChatMessage.displayName = "ChatMessage";