import { tryCatch } from "../utils/tryCatch";
import { Request, Response } from "express";
import CustomError from "../utils/error/CustomError";
import { createMessage, deleteAllChatMessage, deleteOneChat, findOneChat, getAllUserChat, getUserChatHistory, startConversation } from "../services";
import { chatSchema, sendMessageSchema, startChatSchema } from "../validators";


export const createNewChat = tryCatch(async (req: Request, res: Response) => {
      const {userId} = startChatSchema.parse(req.body)
      const message = await startConversation(userId)
      if(!message){
             throw new CustomError(
        "Sorry, Cant Start a conversation",
        400,
      );
      }
       return res.status(201).json({
      status: "success",
      message: "chat started successfully",
      data: {isTyping:true,...message},
    });
  });

  export const getUserChats = tryCatch(async(req: Request, res: Response)=>{
    const {userId} = startChatSchema.parse(req.params)
      const chats  = await getAllUserChat(userId)
      if(chats.length===0){
        throw new CustomError(
          "Sorry, User chat conversation not found",
          400,
        );
      }
      return res.status(200).json({
        status: "success",
        message: "All user chats retrieved successfully",
        data: chats,
      });
  })

  export const sendChatMessage = tryCatch(async(req: Request, res: Response)=>{
    const {chatId,text} = sendMessageSchema.parse(req.body)
      const message  = await createMessage(chatId,text)
      if(!message){
        throw new CustomError(
          "Error while sending message",
          400,
        );
      }
      return res.status(201).json({
        status: "success",
        message: "chat retrieved successfully",
        data: {isTyping:true,...message},
      });
  })

  export const getAllUserMessages = tryCatch(async(req: Request, res: Response)=>{
    const {chatId} = chatSchema.parse(req.params)
      const messages  = await getUserChatHistory(chatId)
      if(messages.length === 0){
        throw new CustomError(
          "User chat history not found",
          400,
        );
      }
      return res.status(201).json({
        status: "success",
        message: "User chat history retrieved successfully",
        data: messages,
      });
  })

  export const deleteChat = tryCatch(async (req: Request, res: Response) => {
    const {chatId} = chatSchema.parse(req.body)
    const existedChat = await findOneChat(chatId)
    if(!existedChat){
           throw new CustomError(
      "Chat not found",
      404,
    );
    }
    await Promise.all([
      deleteAllChatMessage(chatId),
       deleteOneChat(chatId)
    ])
     return res.status(201).json({
    status: "success",
    message: "chat conversation deleted successfully",
    data: null,
  });
});