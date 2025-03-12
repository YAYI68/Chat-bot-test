import prisma from "../db"
import { ChatBotMessage, SenderTypeEnum } from "../enums"


export async function startConversation(userId: string){
    const text = ChatBotMessage.START_CONVERSATION
    const chat = await prisma.chat.create({
        data:{
            userId 
        }
    })
    const message = await prisma.chatMessage.create({
        data:{
            text:text,
            chat:{
                connect: {id: chat.id}
            },
            sender: SenderTypeEnum.CHATBOT
        }
    })
    return message
}

export async function getAllUserChat(userId:string){
    const chats = await prisma.chat.findMany({
        where:{
            userId
        }
    })
    return chats
}

export async function createMessage(chatId: string, text:string){
    await prisma.chatMessage.create({
        data:{
            text:text,
            chat:{
                connect: {id: chatId}
            },
            sender: SenderTypeEnum.USER
        }
    })
    const chatBotText = ChatBotMessage.MESSAGE_RESPONSE
    const chatbotMessage = await prisma.chatMessage.create({
        data:{
            text:chatBotText,
            chat:{
                connect: {id: chatId}
            },
            sender: SenderTypeEnum.CHATBOT
        }
    })
    return chatbotMessage
}

export async function getUserChatHistory(chatId:string){
   const messages = await prisma.chatMessage.findMany({
        where:{
            chatId: chatId
        }
    })
    return messages
}

export async function findOneChat(chatId:string){
    const chat = await prisma.chat.findFirst({
         where:{
             id: chatId
         }
     })
     return chat
 }

 export async function deleteOneChat(chatId:string){
    const chat = await prisma.chat.delete({
         where:{
             id: chatId
         }
     })
     return chat
 }

 export async function deleteAllChatMessage(chatId:string){
    const chat = await prisma.chatMessage.deleteMany({
         where:{
             chatId: chatId
         }
     })
     return chat
 }