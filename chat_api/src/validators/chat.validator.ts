import { z } from "zod";

export const startChatSchema = z.object({
  userId: z
    .string({
      required_error: "UserId is required",
    })
});

export const sendMessageSchema = z.object({
    chatId: z
      .string({
        required_error: "ChatId is required",
      }),
      text: z
      .string({
        required_error: "Message text is required",
      }),
  });

  export const chatSchema = z.object({
    chatId: z
      .string({
        required_error: "ChatId is required",
      })
  });