'use client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../helpers';
import { AxiosError } from 'axios';
import { MessageType } from '@/types';

interface DeleteChatPayload {
  chatId: string;
}

interface DeleteChatResponse {
  data: {
    status: string;
    message: string;
    data: null
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

export function useDeleteChat(
  handlers: TaskHandlers<DeleteChatPayload, DeleteChatResponse>,
) {
  const { mutateAsync, ...others } = useMutation({
    mutationFn: async (payload: DeleteChatPayload) =>
      apiClient.post(`/chats/delete`, payload),
    ...handlers,
  });

  return {
    sendChat: mutateAsync,
    ...others,
  };
}
