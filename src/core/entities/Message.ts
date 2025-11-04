// Entity: Represents the core data model for a message. Independent of any framework or storage.
export interface Message {
  id: string; // Unique identifier for the message
  content: string; // The actual message text
}