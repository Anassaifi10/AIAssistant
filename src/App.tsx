import { useContext, useEffect, useState } from 'react';
import './App.css'
import { CiMicrophoneOn,CiMicrophoneOff } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import callGmini from './gemini';
function App() {
  
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const { speak ,stopSpeaking , isSpeaking }: any = useContext(datacontext);
  const [responseMessage,setResponseMessage]=useState<string>("");
  useEffect(() => {
    if (!listening && transcript) {
      console.log("Transcript:", transcript);
      callGmini(transcript).then((res) => {
        let newres:string|undefined=res?.replace("google","Anas saifi")&&res.replace("Google","Anas saifi");
        setResponseMessage(newres as string);
        speak(newres);
      });
      resetTranscript();
    }
  }, [listening]);

 
  return (
    <div className='main'>

      {/* <img id='ai_girl' src="./src/assets/AIBoy.mp4" alt="" /> */}

      <video
      src="./src/assets/AIBoy.mp4"
      autoPlay
      loop
      muted
      controls={false}
      // style={{ width: "100%", maxWidth: "600px" }}
    />

      <span>Hi I am Anas,Your Advanced Virtual Assistant</span>
      {listening ? (<img src='./src/assets/speak.gif' className='listening'/>):(<>
      {
        isSpeaking ? (
          <>
          <img src='./src/assets/AIVoice.gif'className='ai_speak'/>
          <p className='geminiresponse'>{responseMessage}</p>
          <button onClick={stopSpeaking}>Stop Speaking <CiMicrophoneOff/></button>
          </>
        ) : (
          <button onClick={() => SpeechRecognition.startListening()}>Click here
            <CiMicrophoneOn />
          </button>
        )
      }
      </>)}
      
    </div>
  )
}

export default App
