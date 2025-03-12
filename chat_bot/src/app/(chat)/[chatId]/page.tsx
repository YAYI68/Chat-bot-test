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
    const {chatMessages, isLoading, isSuccess} = useGetChatMessages(chatId as string)
    const {messages, setMessages } = useChatManager()

    useEffect(()=>{
        if(isSuccess){
          setMessages(chatMessages as MessageType[])
        }  
    },[chatMessages, setMessages, isSuccess])

    return <div className=" w-screen h-screen lg:w-full lg:h-full flex flex-col items-center pb-4 lg:bg-white rounded-2xl overflow-x-hidden">
         <ChatHeader />
         {isLoading && <Loader />}
         {isSuccess && 
           <ChatArea messages={messages as MessageType[]} />
         }
        <ChatTextArea />
    </div>
}