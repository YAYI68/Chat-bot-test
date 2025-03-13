'use client'
import { useGetChatMessages } from "@/lib/api/chat";
import { ChatArea, ChatHeader } from "./components";
import { MessageType } from "@/types";
import { useChatManager } from "../../context";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { ChatTextArea } from "./components/chat-text-area";
import { Loader } from "../components/loader";




export default function ChatDetailPage(){
  const params = useParams();
  const chatId = params.chatId;
    const {chatMessages, isLoading, isSuccess} = useGetChatMessages(Number(chatId))
    const {messages, setMessages } = useChatManager()

    useEffect(()=>{
        if(isSuccess){
          setMessages(chatMessages as MessageType[])
        }  
    },[chatMessages, setMessages, isSuccess])

    return <div className=" relative w-screen lg:h-[90vh] h-full lg:w-full p-4  flex flex-col items-center lg:bg-white rounded-2xl overflow-x-hidden ">
         <ChatHeader />
         {isLoading && <Loader />}
         {isSuccess && 
           <ChatArea messages={messages as MessageType[]} />
         }
        <ChatTextArea />
    </div>
}