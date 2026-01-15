import { useState, useRef } from 'react';
import { io } from 'socket.io-client';

export const useScribe = (hospitalId: string) => {
  const [isRecording, setIsRecording] = useState(false);
  const socketRef = useRef<any>(null);

  const startScribe = async () => {
    socketRef.current = io('http://localhost:5000', { query: { hospitalId } });
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        socketRef.current.emit('audio-chunk', event.data);
      }
    };

    mediaRecorder.start(2000); // Send chunks every 2 seconds
    setIsRecording(true);
  };

  const stopScribe = () => {
    socketRef.current.emit('stop-recording');
    setIsRecording(false);
  };

  return { isRecording, startScribe, stopScribe };
};