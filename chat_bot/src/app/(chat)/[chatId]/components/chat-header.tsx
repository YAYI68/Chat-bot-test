'use client'
import Image from "next/image"
import { BarIcon } from "./icon/bar-Icon"

const chatToUrl = {
    chatbot: require('./assets/avatar1.png')
}
export function ChatHeader (){

    return <div className="w-full p-2  border-b-2  z-10 flex justify-between items-center">
      <div className=" flex items-center gap-3">
      <div className="size-[3rem] relative">
        <Image src={chatToUrl.chatbot} alt="chatbot" fill className="size-full"  />
      </div>
        <span className="text-label-200">Chatbot</span>
        </div>  
        <button className="flex lg:hidden size-[2rem]">
          <BarIcon />
        </button>
    </div>
}