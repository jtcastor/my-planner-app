import React, { useContext, useEffect } from 'react'; // Add useEffect import
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../contexts/AppContext';

// Component: UI for displaying and editing the message.
// Consumes context for state.
// Displays the current saved message in <Text>, provides an input for new content with placeholder,
// and clears the input after saving to show the placeholder again.
// Added placeholderTextColor to ensure visibility on iOS devices (e.g., Expo Go), as defaults may hide it in certain modes (e.g., dark mode).
export const MessageDisplay: React.FC = () => {
  const { message, updateMessage } = useContext(AppContext)!;
  const [input, setInput] = React.useState(''); // Initialize input as empty to show placeholder initially

  useEffect(() => {
    // Syncs input state with an empty string on mount or after updates (optional if always clearing).
    setInput(''); // Ensures input starts empty and clears after context changes (e.g., after save)
  }, [message.content]); // Runs whenever message.content changes to reset input

  const handleSave = async () => {
    // Handles save: Updates message via context, then clears the input to show placeholder.
    await updateMessage(input);
    setInput(''); // Clears input after successful save
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{message.content}</Text>
      <TextInput value={input} onChangeText={setInput} placeholder="Enter Message..." placeholderTextColor="gray" />
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <Text style={styles.addButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
    // Renders UI in single line to avoid text errors; added placeholder and color for iOS visibility
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#233144',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFD41A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})