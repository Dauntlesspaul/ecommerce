import { useState, useCallback, useEffect } from 'react';

const useSoundHook = (url) => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);

  const loadSound = useCallback(async () => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await context.decodeAudioData(arrayBuffer);
      setAudioBuffer(buffer);
    }
  }, [audioContext, url]);

  const playSound = useCallback(async () => {
    if (audioContext && audioBuffer) {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  }, [audioContext, audioBuffer]);

  useEffect(() => {
    const handleUserGesture = async () => {
      await loadSound();
      if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
      }
    };

    const handleClick = () => {
      handleUserGesture();
      document.removeEventListener('click', handleClick);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [audioContext, loadSound]);

  return playSound;
};

export default useSoundHook;
