'use client'

type ChatDateDividerProp = {
    text: string
}

export function ChatDateDivider({text}:ChatDateDividerProp){

    return <div className="flex w-full justify-center items-center">
          <p className="w-fit font-[400] text-label-200">{text}</p>
    </div>
}