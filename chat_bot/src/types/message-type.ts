export type MessageType ={
    id: string;
    chatId: number
    text: string;
    createdAt: Date | string
    sender: 'chatbot' | 'user'
    isTyping?: boolean
}

export type Chat = {
    id: number;
    userId: string;
    createdAt: Date | string
} 