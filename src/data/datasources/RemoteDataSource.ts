// Remote Data Source: Placeholder for backend sync. Offline-only, so it logs intent.
// In a real app, this would use API calls (e.g., fetch to backend).
export class RemoteDataSource {
  async syncMessage(_message: any): Promise<void> {
    try {
      // Placeholder: Simulates sync without actual network call.
      console.log('Would sync to backend: ', _message); // No-op for offline mode
    } catch (error) {
      console.error('Error in RemoteDataSource syncMessage:', error); // Logs if future impl fails
    }
  }
}