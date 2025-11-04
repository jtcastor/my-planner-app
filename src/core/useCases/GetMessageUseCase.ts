import { Message } from '../entities/Message';

// Use Case: Encapsulates business logic to retrieve a message from the repository.
// This ensures business rules (e.g., default message) are centralized.
export class GetMessageUseCase {
  constructor(private repository: { getMessage: () => Promise<Message> }) {} // Dependency injection for repository

  async execute(): Promise<Message> {
    // Executes the use case: Fetches message or returns default if none exists.
    return this.repository.getMessage();
  }
}