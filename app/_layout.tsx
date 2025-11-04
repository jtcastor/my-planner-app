import { Stack } from 'expo-router';

// Layout: Configures stack navigation for the app.
// Expo Router handles routing based on file structure.
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#233144',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack> // Returns navigator directly
  )
}