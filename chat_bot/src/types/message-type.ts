export type MessageType ={
    id: string;
    chatId: string
    text: string;
    createdAt: Date | string
    sender: 'chatbot' | 'user'
    isTyping?: boolean
}

export type Chat = {
    id: string;
    userId: string;
    createdAt: Date | string
} 