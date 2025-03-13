import { z } from "zod";

export const startChatSchema = z.object({
  userId: z
    .string({
      required_error: "UserId is required",
    })
});

export const sendMessageSchema = z.object({
  chatId: z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), { message: "ChatId must be a number" }),
      text: z
      .string({
        required_error: "Message text is required",
      }),
  });

  export const chatSchema = z.object({
    chatId: z
      .union([z.number(), z.string()])
      .transform((val) => (typeof val === "string" ? Number(val) : val))
      .refine((val) => typeof val === "number" && !isNaN(val), { message: "ChatId must be a valid number" }),
  });