'use client'
import { useEffect, useRef, useState } from "react";
import { MessageType } from "../../../../types/message-type";
import { GroupedMessage, groupMessagesByDate } from "./utils/group-message";
import { formatDateWithOrdinal } from "./utils/date";
import { ChatMessage } from "./chat-message";
import { ChatDateDivider } from "./chat-date-divider";
import { ChatTextArea } from "./chat-text-area";

type ChatAreaProp = {
  messages: MessageType[]
}

export function ChatArea({messages}:ChatAreaProp){
  console.log({messages})
    const [groupedMessages, setGroupMessages] = useState<Array<GroupedMessage>>(
        [],
      );
      const lastMessageRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
        lastMessageRef.current?.scrollIntoView({
          behavior: 'smooth',
        });
        setGroupMessages(groupMessagesByDate(messages as MessageType[]));
      }, [messages]);
      if (!messages) return 'No Chat Messages Available';
   return <div className="w-full h-full flex-1 flex flex-col gap-3 p-2 relative">
         {groupedMessages.map((groupedMessage, i) => (
          <div key={groupedMessage.date + i} className="flex flex-col gap-3">
            <ChatDateDivider
              text={formatDateWithOrdinal(groupedMessage.date)}
            />
            {groupedMessage.messages.map((message, i) => (
              <ChatMessage
                ref={i + 1 === messages.length ? lastMessageRef : null}
                key={i}
                message={message}
              />
            ))}
          </div>
        ))}
    </div>
}