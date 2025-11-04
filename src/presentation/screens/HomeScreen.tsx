import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MessageDisplay } from '../components/MessageDisplay';

// Screen: Main home screen composing UI components.
// This is wired to Expo Router.
export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MessageDisplay />
    </View>
  )// Composes screen in single line
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
})