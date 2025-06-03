import { useContext, useEffect, useState } from 'react';
import './App.css'
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import AIGirl from './assets/AIGirl.jpg'
import AISpeak from './assets/speak.gif'
import AIVoice from './assets/AIVoice.gif'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatsContainer from './Components/ChatsContainer';
function App() {

  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const { stopSpeaking, isSpeaking, responseMessage, callGemini }: any = useContext(datacontext);

  const [isshowChats, setIsShowChats] = useState<boolean>(false);
  useEffect(() => {
    if (!listening && transcript) {

      callGemini(transcript.toLocaleLowerCase());
      resetTranscript();
    }
  }, [listening]);


  return (
    <div className="flex flex-col items-center text-center bg-black justify-around  min-h-screen  px-4">
      <ChatsContainer isshowChats={isshowChats} setShowChats={setIsShowChats} />
      <img
        id="ai_girl"
        className="w-36 h-36 md:w-56 md:h-56 rounded-full shadow-lg mb-4 object-cover"
        src={AIGirl}
        alt="AI Assistant"
      />
      {!isshowChats?<IoChatbubbleEllipsesOutline
      onClick={() => setIsShowChats(true)}
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
        hover:text-[#a33ba8] "
      />:<></>
      }

      <span className="text-2xl sm:text-2xl md:text-3xl bg-gradient-to-r from-[#2dbabe] to-[#a33ba8] bg-clip-text text-transparent">
       Hi, I am Lyra, your Advanced Virtual Assistant.
      </span>

      {listening ? (
        <img
          src={AISpeak}
          className='w-lg h-lg cursor-pointer'
          alt="Listening"
          onClick={() => SpeechRecognition.stopListening()}
        />
      ) : (
        <>
          {isSpeaking ? (
            <div className="flex flex-col items-center">
              <img
                src={AIVoice}
                alt="Speaking"
                className="
                      w-[500px] h-[100px]
                      sm:w-[400px] sm:h-[80px]
                      md:w-[300px] md:h-[70px]
                      lg:w-[400px] lg:h-[90px]
                      xl:w-[1000px] xl:h-[100px]
                      mb-2
                    "
              />
              <p className="text-base md:text-lg text-gray-200 mb-2 text-center px-2 break-words max-w-xs md:max-w-md">
                {responseMessage}
              </p>
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Stop Speaking <CiMicrophoneOff size={22} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => SpeechRecognition.startListening()}
              className="h-[40px] w-[180px] flex items-center justify-center border-none rounded-[10px] cursor-pointer text-[20px] bg-[#2dbabe] transition-all duration-300 ease-in-out hover:shadow-[2px_2px_50px_#2dbabe]"
            >
              Click here <CiMicrophoneOn size={24} />
            </button>
          )}
        </>
      )}

     
    </div>
  )
}

export default App
