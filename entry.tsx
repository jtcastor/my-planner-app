import { registerRootComponent } from 'expo'; // Registers the root component for Expo
import { ExpoRoot } from 'expo-router'; // The core Expo Router component
import { AppProviders } from './src/AppProviders'; // Import providers wrapper

// Custom App: Wraps the Expo Router with global providers.
// This ensures contexts are available app-wide without interfering with layout validation.
function App() {
  const ctx = require.context('./app'); // Loads the app/ directory for file-based routes
  return <AppProviders><ExpoRoot context={ctx} /></AppProviders>; // Wraps router system
}

registerRootComponent(App); // Registers this as the app's root component