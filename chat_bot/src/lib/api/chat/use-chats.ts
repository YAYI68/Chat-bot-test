import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../helpers';
import { Chat } from '@/types';


interface ChatHistoryResponse {
  status: string;
  message: string;
  data: Chat[];
}

interface ErrorResponse {
  status: string;
  message: string;
}

export function useChats(chatId:number, userId:string) {
  const { data, error, ...others } = useQuery<
    ChatHistoryResponse,
    ErrorResponse
  >({
    queryFn: async () => {
      const { data } = await apiClient.get<ChatHistoryResponse>(`/chats/${userId}`);
      return data;
    },
    queryKey: ['chats',`${userId}`,`${chatId}`],
  });

  const chats = data?.data;

  return {
    chats,
    error,
    ...others,
  };
}
