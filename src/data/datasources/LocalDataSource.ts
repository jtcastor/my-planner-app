import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '../../core/entities/Message';

// Local Data Source: Handles persistent storage using AsyncStorage (offline-first).
// Implements actual data ops for local use.
const STORAGE_KEY = '@message';

export class LocalDataSource {
  async getMessage(): Promise<Message> {
    try {
      // Retrieves message from local storage or returns default.
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('AsyncStorage getItem result:', jsonValue); // Debug log: Check what is returned (null or JSON)
      return jsonValue ? JSON.parse(jsonValue) : { id: '1', content: 'Hello World' };
    } catch (error) {
      console.error('Error in LocalDataSource getMessage:', error); // Logs specific error
      return { id: '1', content: 'Hello World (get failed)' }; // Explicit fallback
    }
  }

  async saveMessage(message: Message): Promise<void> {
    try {
      // Saves message to local storage.
      const jsonValue = JSON.stringify(message);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('AsyncStorage setItem success for:', message); // Debug log: Confirm save
    } catch (error) {
      console.error('Error in LocalDataSource saveMessage:', error); // Logs save errors
    }
  }
}