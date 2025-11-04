import { Message } from '../entities/Message';

// Use Case: Encapsulates business logic to save a message to the repository.
// Handles any validation or transformation before saving.
export class SaveMessageUseCase {
  constructor(private repository: { saveMessage: (message: Message) => Promise<void> }) {} // Dependency injection

  async execute(message: Message): Promise<void> {
    // Executes the use case: Validates (if needed) and saves the message.
    if (!message.content.trim()) {
      throw new Error('Message cannot be empty'); // Simple business rule
    }
    await this.repository.saveMessage(message);
  }
}