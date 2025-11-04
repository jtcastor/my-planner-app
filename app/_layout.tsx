import { Stack } from 'expo-router';

// Layout: Configures stack navigation for the app.
// Expo Router handles routing based on file structure.
export default function Layout() {
  return <Stack><Stack.Screen name="index" options={{ title: 'Home' }} /></Stack>; // Returns navigator directly
}