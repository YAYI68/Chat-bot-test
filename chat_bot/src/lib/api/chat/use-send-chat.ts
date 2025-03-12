'use client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../helpers';
import { AxiosError } from 'axios';
import { MessageType } from '@/types';

interface SendChatPayload {
  chatId: string;
  text: string
}

interface StartChatResponse {
  data: {
    status: string;
    message: string;
    data: MessageType
  };
}

interface ErrorResponse {
  status: string;
  message: string;
}
type TaskHandlers<P, R> = Pick<
  UseMutationOptions<R, AxiosError<ErrorResponse>, P>,
  'onSuccess' | 'onError' | 'onSettled'
>;

export function useSendChat(
  handlers: TaskHandlers<SendChatPayload, StartChatResponse>,
) {
  const { mutateAsync, ...others } = useMutation({
    mutationFn: async (payload: SendChatPayload) =>
      apiClient.post(`/chats/message`, payload),
    ...handlers,
  });

  return {
    sendChat: mutateAsync,
    ...others,
  };
}
