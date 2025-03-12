'use client';
import { MessageType } from '@/types';
import { PropsWithChildren, useState, createContext, useContext } from 'react';

type ContentType = {
  chatId: string
  num: number
}
// Define the shape of the context
interface ChatContextType {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setIsModal:  React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean
  modalContent: ContentType 
  setModalContent: React.Dispatch<React.SetStateAction<ContentType>>
}

// Create the context with an explicit type or null as default
const ChatManagerContext = createContext<ChatContextType | null>(null);

interface ChatManagerProps extends PropsWithChildren {}

// WebSocket provider function
export function ChatManagerWrapper({ children }: ChatManagerProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isModal,setIsModal] = useState(false)
  const [modalContent, setModalContent] = useState({
   chatId:'',
   num: 0
  })

  return (
    <ChatManagerContext.Provider value={{ messages, setMessages, isModal,setIsModal, modalContent, setModalContent }}>
      {children}
    </ChatManagerContext.Provider>
  );
}

// Custom hook to use the context
export const useChatManager = () => {
  const context = useContext(ChatManagerContext);
  if (!context) {
    throw new Error('useChatManager must be used within a ChatManagerWrapper');
  }
  return context;
};
