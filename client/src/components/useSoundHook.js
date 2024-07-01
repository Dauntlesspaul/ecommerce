import { useEffect, useRef } from 'react';

const useSound = (url) => {
  const audioContextRef = useRef(null);
  const bufferRef = useRef(null);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;

    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        bufferRef.current = audioBuffer;
      });

    return () => {
      audioContext.close();
    };
  }, [url]);

  const playSound = () => {
    if (bufferRef.current && audioContextRef.current) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = bufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0);
    }
  };

  return playSound;
};

export default useSound;
