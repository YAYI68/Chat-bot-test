import { MessageType } from "../../../../../types/message-type";

export type GroupedMessage = {
  date: string;
  messages: MessageType[];
};
export function groupMessagesByDate(messages: MessageType[]): GroupedMessage[] {
  if (!messages) return [];
  return messages.reduce<GroupedMessage[]>((grouped, message) => {
    const date = new Date(message.createdAt as Date)
      .toISOString()
      .split('T')[0]; // Extract 'yyyy-mm-dd'
    const existingGroup = grouped.find((group) => group.date === date);

    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      grouped.push({ date, messages: [message] });
    }

    return grouped;
  }, []);
}