import { useChatManager } from "@/app/context"
import { useDeleteChat } from "@/lib/api/chat";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


type ChatModalProp = {
    num : number,
    chatId: string
}

export function ChatModal () {
    const router = useRouter()
     const {setIsModal, modalContent, setModalContent} = useChatManager()
     const { deleteChat } = useDeleteChat({
        onSuccess: ({ data: { data } }) => {
          setModalContent({chatId: 0})
        },
        onError: () => {
          toast.error('Error occur deleting chat ');
        },
      });
      function handleSubmit() {
              void deleteChat({
                  chatId: modalContent.chatId
                });
                setIsModal(false)
                router.push('/')

          }
    return <div className="w-screen h-screen fixed  inset-0 backdrop-blur-xs backdrop-brightness-90 z-50 left-0 top-0">
      <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-[80%] lg:w-[27rem] h-fit p-8 rounded-lg bg-primary-200 flex flex-col gap-4">
            <p className="text-label-500 text-center">Are you sure you want to delete Conversation {modalContent.chatId}?</p>
            <div className="w-full flex gap-2 items-center justify-center">
                <button onClick={()=>setIsModal(false)} className="bg-primary-500 text-label-500 p-2 text-center w-[49%] rounded-3xl">Cancel</button>
                <button onClick={handleSubmit} className="bg-red-600 p-2 text-center w-[49%] rounded-3xl">Delete</button>
            </div>
          </div>
      </div>
    </div>
}