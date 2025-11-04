import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Message } from '../../core/entities/Message';
import { GetMessageUseCase } from '../../core/useCases/GetMessageUseCase';
import { SaveMessageUseCase } from '../../core/useCases/SaveMessageUseCase';
import { MessageRepositoryImpl } from '../../data/repositories/MessageRepository';

// Context: Manages app-wide state using React Context (preferred over Redux for simplicity).
// Provides state and actions to components.
const repository = new MessageRepositoryImpl(); // Singleton for demo
const getUseCase = new GetMessageUseCase(repository);
const saveUseCase = new SaveMessageUseCase(repository);

interface AppContextType {
  message: Message;
  updateMessage: (content: string) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<Message>({ id: '1', content: 'Loading...' });

  useEffect(() => {
    // On mount: Loads initial message via use case, with error handling.
    getUseCase.execute()
      .then((loadedMessage) => {
        console.log('Loaded message from use case:', loadedMessage); // Debug log: Confirm what is loaded
        setMessage(loadedMessage);
      })
      .catch(error => {
        console.error('Error loading message in context:', error); // Logs error for debugging
        setMessage({ id: '1', content: 'Hello World (fallback)' }); // Fallback to default
      });
  }, []);

  const updateMessage = async (content: string) => {
    // Action: Updates message via use case, then refreshes state.
    const newMessage = { ...message, content };
    try {
      await saveUseCase.execute(newMessage);
      setMessage(newMessage);
      console.log('Updated message:', newMessage); // Debug log: Confirm update
    } catch (error) {
      console.error('Error saving message in context:', error); // Logs save errors
    }
  };

  return <AppContext.Provider value={{ message, updateMessage }}>{children}</AppContext.Provider>; // Provides context without whitespace issues
};