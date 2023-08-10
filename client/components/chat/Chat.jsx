import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ... (previous code)

const ChatInput = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isInputFocused, setInputFocused] = useState(false);
  
    const sendMessage = () => {
      if (message.trim() !== '') {
        setMessages([...messages, message]); // Add the typed message to the messages array
        setMessage('');
      }
    };
  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setInputFocused(true);
      });
  
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setInputFocused(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text>{msg}</Text>
            </View>
          ))}
        </View>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            style={[styles.input, isInputFocused && styles.inputFocused]}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    messagesContainer: {
      flex: 1,
      paddingVertical: 10,
    },
    messageContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      marginBottom: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    },
    input: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: 'white', // Add a white background for iOS to prevent visual glitches
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    inputFocused: {
      position: 'absolute',
      bottom: '100%',
    },
    sendButton: {
      backgroundColor: '#FFA500',
      borderRadius: 20,
      padding: 10,
      marginLeft: 10,
    },
  });
  
  export default ChatInput;
  