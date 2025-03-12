'use client'
import Image from "next/image"

const chatToUrl = {
    chatbot: require('./assets/avatar1.png')
}
export function ChatHeader (){

    return <div className="w-full p-2  border-b-2 sticky z-10">
      <div className=" flex items-center gap-3">
      <div className="size-[3rem] relative">
        <Image src={chatToUrl.chatbot} alt="chatbot" fill className="size-full"  />
      </div>
        <span className="text-label-200">Chatbot</span>
        </div>  
    </div>
}