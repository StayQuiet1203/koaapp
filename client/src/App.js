import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ChatBox from './components/ChatBox';
import FileUpload from './components/FileUpload';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { text: message, sender: 'user' }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send message to backend
      const res = await axios.post('/api/chat', { message });
      
      // Add response to chat
      setMessages([...newMessages, { text: res.data.response, sender: 'assistant' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages,
        { text: 'Sorry, there was an error processing your request.', sender: 'assistant' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileUploaded(true);
      setMessages([
        ...messages,
        { 
          text: `Clinical trial data loaded successfully! ${res.data.rowCount} records available. You can now ask questions about the clinical trials.`, 
          sender: 'assistant' 
        }
      ]);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages([
        ...messages,
        { text: 'Sorry, there was an error uploading your file.', sender: 'assistant' }
      ]);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Clinical Trial Chat Agent</h1>
      </header>
      <main className="app-main">
        <div className="container">
          {!fileUploaded && (
            <div className="upload-section">
              <h2>Upload Clinical Trial Data</h2>
              <p>Please upload an Excel file containing clinical trial information:</p>
              <FileUpload onFileUpload={handleFileUpload} />
            </div>
          )}
          <ChatBox 
            messages={messages} 
            sendMessage={sendMessage} 
            isLoading={isLoading}
          />
        </div>
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Clinical Trial Chat Agent</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 