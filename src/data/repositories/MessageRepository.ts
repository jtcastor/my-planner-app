import { Message } from '../../core/entities/Message';
import { LocalDataSource } from '../datasources/LocalDataSource';
import { RemoteDataSource } from '../datasources/RemoteDataSource';

// Repository Interface: Abstracts data operations. Injected into use cases.
// Allows swapping implementations without changing core logic.
export interface MessageRepository {
  getMessage(): Promise<Message>;
  saveMessage(message: Message): Promise<void>;
  syncToBackend(): Promise<void>; // Placeholder for future sync
}

// Repository Implementation: Composes local and remote sources.
// Handles data flow: Local first, then placeholder sync.
export class MessageRepositoryImpl implements MessageRepository {
  private localSource = new LocalDataSource();
  private remoteSource = new RemoteDataSource();

  async getMessage(): Promise<Message> {
    // Fetches from local source (offline-first).
    return this.localSource.getMessage();
  }

  async saveMessage(message: Message): Promise<void> {
    // Saves to local, then triggers placeholder sync.
    await this.localSource.saveMessage(message);
    await this.syncToBackend();
  }

  async syncToBackend(): Promise<void> {
    // Placeholder sync: Gets local data and "sends" to remote.
    const message = await this.localSource.getMessage();
    await this.remoteSource.syncMessage(message);
  }
}