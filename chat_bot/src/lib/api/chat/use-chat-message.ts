import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../helpers';
import { MessageType } from '@/types';

interface ChatMessageResponse {
  status: string;
  message: string;
  data: MessageType[];
}

interface ErrorResponse {
  status: string;
  message: string;
}

export function useGetChatMessages(chatId: number) {
  const { data, error, ...others } = useQuery<
    ChatMessageResponse,
    ErrorResponse
  >({
    queryFn: async () => {
      const { data } = await apiClient.get<ChatMessageResponse>(
        `/chats/${chatId}/history`,
      );
      return data;
    },
    queryKey: ['chats', `${chatId}`, 'history'],
  });

  const chatMessages = data?.data;

  return {
    chatMessages,
    error,
    ...others,
  };
}
