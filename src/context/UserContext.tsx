import React, { createContext, useState } from 'react'
export const datacontext = createContext({});


function UserContext({ children }: { children: React.ReactNode }) {
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  function speak(text: string) {
    console.log("Speaking:", text);
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    // Try to select a female voice
    text_speak.onstart = () => {
      setIsSpeaking(true);
    };
    text_speak.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(text_speak);
  }
  function stopSpeaking() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    console.log("Speech synthesis stopped.");
  }
}
  
  let value = {
    speak,
    stopSpeaking,
    isSpeaking
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