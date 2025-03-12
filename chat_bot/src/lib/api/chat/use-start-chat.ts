'use client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../helpers';
import { AxiosError } from 'axios';
import { MessageType } from '@/types';

interface StartChatPayload {
  userId: string;
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
type TaskHandlers<P,R> = Pick<
  UseMutationOptions<R, AxiosError<ErrorResponse>, P>,
  'onSuccess' | 'onError' | 'onSettled'
>;

export function useStartChat(
  handlers: TaskHandlers<StartChatPayload, StartChatResponse>,
) {
  const { mutateAsync, ...others } = useMutation({
    mutationFn: async (payload: StartChatPayload) =>
      apiClient.post('/chats/new',payload),
    ...handlers,
  });

  return {
    startChat: mutateAsync,
    ...others,
  };
}
