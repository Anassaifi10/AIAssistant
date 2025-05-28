import React, { createContext, useState } from 'react'
import Gemini from '../gemini';
import type { ChatMessage } from '../Model/Chat';
export const datacontext = createContext({});



function UserContext({ children }: { children: React.ReactNode }) {

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [chats, setChats] = useState<ChatMessage[]>([]);

  function speak(text: string) {
    console.log("Speaking:", text);

    // Load voices safely
    const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
        return new Promise((resolve) => {
            let voices = window.speechSynthesis.getVoices();
            if (voices.length) {
                resolve(voices);
            } else {
                window.speechSynthesis.onvoiceschanged = () => {
                    voices = window.speechSynthesis.getVoices();
                    resolve(voices);
                };
            }
        });
    };

    loadVoices().then((voices) => {
      console.log("Available voices:", voices);
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;

        // Try to find an Indian English or Hindi voice
        const indianVoice = voices.find(voice =>
            voice.lang === "en-IN" || voice.lang === "hi-IN"
        );

        if (indianVoice) {
            utterance.voice = indianVoice;
            utterance.lang = indianVoice.lang;
        } else {
            // Fallback to English (US)
            utterance.lang = "en-US";
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    });
}

  function stopSpeaking() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      console.log("Speech synthesis stopped.");
    }
  }
  async function callGemini(transcript: string) {

    console.log("Transcript:", transcript);
    setChats((prevChats) => [
      ...prevChats,
      {
        message: transcript,
        sender: "User",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: prevChats.length
      }
    ]);
    if (transcript.includes("open") && transcript.includes("youtube")) {
      window.open("https://www.youtube.com", "_blank");
      setChats((prevChats) => [
        ...prevChats,
        {
          message: "Opening YouTube...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }
      ]);
    }
    else if (transcript.includes("open") && transcript.includes("instagram")) {
      window.open("https://www.instagram.com", "_blank");
      setChats((prevChats) => [
        ...prevChats,
        {
          message: "Opening Instagram...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }
      ]);
    } else if (transcript.includes("open") && transcript.includes("github")) {
      setChats((prevChats) => [
        ...prevChats,
        {
          message: "Opening GitHub...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }
      ]);
      window.open("https://www.github.com", "_blank");
    } else if (transcript.includes("open") && (transcript.includes("this pc") || transcript.includes("my computer"))) {
      window.open("file:///", "_blank");
      setChats((prevChats) => [
        ...prevChats,
        {
          message: "Opening This PC...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }
      ]);
    } else if (transcript.includes("open") && transcript.includes("google")) {
      setChats((prevChats) => [
        ...prevChats,
        {
          message: "Opening Google...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }
      ]);
      window.open("https://www.google.com", "_blank");
    } else if (transcript.includes("open") && transcript.includes("facebook")) {
      setChats((prevChats) => [
        ...prevChats,
        {
          message: "Opening Facebook...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }
      ]);
      window.open("https://www.facebook.com", "_blank");
    } else if (transcript.includes("open") && transcript.includes("twitter")) {
      setChats((prevChats) => [
        ...prevChats, {
          message: "Opening Twitter...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }]);
      window.open("https://www.twitter.com", "_blank");
    } else if (transcript.includes("open") && transcript.includes("gmail")) {
      setChats((prevChats) => [
        ...prevChats,
        {
          message: "Opening Gmail...",
          sender: "AI",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: prevChats.length
        }
      ]);
      window.open("https://mail.google.com", "_blank");
    } else {
      Gemini(transcript).then((res) => {
        let newres: string | undefined = res?.replace("google", "Anas saifi") && res.replace("Google", "Anas saifi");
        setResponseMessage(newres as string);
        setChats((prevChats) => [
          ...prevChats,
          {
            message: newres as string,
            sender: "AI",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            id: prevChats.length
          }]);
        speak(newres as string);
      });
    }
  }

  let value = {
    speak,
    stopSpeaking,
    isSpeaking,
    responseMessage,
    callGemini,
    chats
  }

  return (
    <>
      <datacontext.Provider value={{ ...value }}>
        {children}
      </datacontext.Provider>
    </>
  )
}

export default UserContext;