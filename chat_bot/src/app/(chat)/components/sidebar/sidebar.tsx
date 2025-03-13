'use client'
import { FormEvent, useState } from "react";
import { PlusIcon, TrashIcon } from "./icon";
import toast from 'react-hot-toast';
import { useChats, useStartChat } from "@/lib/api/chat";
import { getOrCreateUserId } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useChatManager } from "@/app/context";
import { ChatModal } from "../modal";
import { Loader } from "../loader";

export function ChatSidebar(){
  const {setModalContent, modalContent} = useChatManager()
  const pathname = usePathname();
  const params = pathname.split('/')[1]
  const router = useRouter();
  const userId = getOrCreateUserId()
  const { startChat } = useStartChat({
    onSuccess: ({ data: { data } }) => {
      setModalContent({chatId:data.chatId})
      router.push(`/${data.chatId}`);
    },
    onError: () => {
      toast.error('Error occur starting up this chat ');
    },
  });
  function handleSubmit() {
    void startChat({
      userId,
    });
  }
  const { chats, isLoading, isSuccess } = useChats(modalContent.chatId,userId as string);
    return <div className={`h-screen ${params?'hidden lg:flex':'flex w-full'} lg:h-[45rem] w-full lg:w-[30%] bg-primary-200 flex-col gap-4`}>
      <button onClick={handleSubmit} className="w-full h-[3rem] bg-primary-500 rounded-md shadow-md flex items-center justify-center gap-4">
        <PlusIcon />  <span className="text-label-500">conversations</span> 
      </button>
      {isLoading && <Loader />}
      {isSuccess && 
       <div className="flex flex-col gap-4">
       {chats?.length? chats.map((chat, i)=>(
        <>
          <Conversation key={chat.id} chatId={chat.id}  />
        </>
       )):""}
       
       </div>
      }
     
    </div>
}

type ConversationProp = {
  chatId: number
}

function Conversation(prop:ConversationProp){
  const {setIsModal, modalContent, setModalContent} = useChatManager()
  const router = useRouter()
   const navigate=()=>{
    router.push(`/${prop.chatId}`);
   }

   const handleDelete=()=>{
    setIsModal(true)
    setModalContent({
      chatId: prop.chatId,
    })
   }

   return <div className="w-full rounded-2xl bg-secondary-200 opacity-70 hover:opacity-100 h-[3rem] flex">
        <button onClick={navigate} className=" flex items-center justify-between px-4 w-[85%]">
       <span className="text-label-200">conversation {prop.chatId}</span>
    </button>
    <button onClick={handleDelete} className=" flex items-center justify-between px-4 w-[15%]">
    <TrashIcon />
    </button>
   </div>
  
}