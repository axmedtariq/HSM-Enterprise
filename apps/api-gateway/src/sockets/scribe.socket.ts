import { Server } from 'socket.io';
import { generateMedicalNote } from '../services/ai.service';

export const setupScribeSocket = (io: Server) => {
  io.on('connection', (socket) => {
    let transcript = "";

    socket.on('audio-chunk', async (data) => {
      // 1. Send chunk to Speech-to-Text (e.g., OpenAI Whisper v4)
      const textChunk = await speechToText(data);
      transcript += textChunk + " ";
      
      // 2. Send partial transcript back to UI for real-time viewing
      socket.emit('partial-transcript', transcript);
    });

    socket.on('stop-recording', async () => {
      // 3. Final Step: Convert raw text into a professional Medical Note
      const medicalNote = await generateMedicalNote(transcript);
      socket.emit('final-note', medicalNote);
    });
  });
};