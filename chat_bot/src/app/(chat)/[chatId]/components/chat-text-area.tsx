'use client'
import { v4 as uuidv4 } from 'uuid';
import { getOrCreateUserId } from "@/lib/utils";
import { SendIcon } from "./icon";
import { useSendChat, useStartChat } from "@/lib/api/chat";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useChatManager } from "../../../context";
import { MessageType } from "@/types";


export function ChatTextArea (){
    const [text,setText]= useState('')
    const { setMessages} = useChatManager()
    const params = useParams();
    const chatId = params.chatId;
    const userId = getOrCreateUserId()
    const addMessage = (newMessage: MessageType) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };
      
    const { sendChat } = useSendChat({
      onSuccess: ({ data: { data } }) => {
        addMessage(data)
      },
      onError: () => {
        toast.error('Error occur sending message ');
      },
    });
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(text.trim().length>0){
            void sendChat({
                chatId: chatId as string,
                text
              });
              addMessage({
                id: uuidv4(),
                chatId: chatId as string,
                text,
                createdAt: new Date(),
                sender: 'user'
              })
              setText('')
        }
    }

    return <form  onSubmit={handleSubmit} className="w-[95%] p-4 flex overflow-hidden rounded-3xl bottom-5 lg:left-5 bg-secondary-300">
        <input onChange={(e)=>setText(e.target.value)} type="text" className="w-full bg-secondary-300 focus-within:outline-none text-label-500" />
        <button className="size-[2rem]">
            <SendIcon />
        </button>
    </form>
}