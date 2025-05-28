
import { RxCross2 } from "react-icons/rx";
import { datacontext } from "../context/UserContext";
import { useContext } from "react";
import type { ChatMessage } from "../Model/Chat";

function ChatsContainer({ isshowChats, setShowChats }: any) {
    const { chats }:any = useContext(datacontext);
    return (
        <div className={`fixed top-0 z-40 left-0 h-screen w-full bg-gradient-to-br p-6 flex flex-col overflow-y-auto
    transition-all duration-500 ease-in-out
        ${isshowChats ? "h-screen opacity-100 pointer-events-auto" :
                "h-0 opacity-0 pointer-events-none"}`}  >
            <div className="w-full flex justify-center">
                <RxCross2
                onClick={() => setShowChats(false)}
                    className="
                            absolute 
                            top-10 right-5
                            md:right-1/5
                            text-4xl              
                            text-[#2dbabe]         
                            animate-bounce         
                            drop-shadow-lg         
                            transition-transform 
                            hover:scale-110        
                            hover:text-[#a33ba8] "/>
                <div className="w-full max-w-screen-lg bg-zinc-900/90 rounded-xl shadow-xl p-6">
                    <h2 className="text-indigo-400 text-2xl font-bold mb-6 text-center">Chats</h2>

                    <div className="flex flex-col gap-4">
                        {chats.map((chat: ChatMessage) => (
                            <div
                            key={chat.id}
                                className={`
                  max-w-[80%] px-4 py-3 rounded-2xl shadow-md break-words relative
                  ${chat.sender === 'AI' ? 'self-start bg-zinc-600 text-zinc-100' : 'self-end bg-indigo-500 text-white'}
                `}
                            >
                                <div className="text-base my-1">{chat.message}</div>
                                <div className={`text-xs text-right ${chat.sender === 'AI' ? 'text-indigo-300' : 'text-indigo-100'}`}>
                                    {chat.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatsContainer;
