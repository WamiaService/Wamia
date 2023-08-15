// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import io from 'socket.io-client'
// import {WebView} from "react-native"
// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [isInputFocused, setInputFocused] = useState(false);
//     const socket = io('http://192.168.104.7:4000')
//     const sendMessage = () => {
//       if (message.trim() !== '') {
//         // Send the message to the server via WebSocket
//         socket.emit('newMessage', {
//           content: message,
//           senderId: 1, // Replace with the user's sender ID
//           receiverId: 2, // Replace with the admin's receiver ID
//         });
  
//         // Add the typed message to the messages array
//         setMessages([...messages, message]);
  
//         setMessage('');
//       }
//     };
  
//     useEffect(() => {
//       const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//         setInputFocused(true);
//       });
  
//       const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//         setInputFocused(false);
//       });
//       socket.on('newMessage', (data) => {
//         // Add the received message to the messages array
//         setMessages([...messages, data.content]);
//       })
  
//       return () => {
//         keyboardDidShowListener.remove();
//         keyboardDidHideListener.remove();
//         socket.disconnect();
//       };
//     }, []);
  
//     return (
//       <View style={styles.container}>
//         <View style={styles.messagesContainer}>
//           {messages.map((msg, index) => (
//             <View key={index} style={styles.messageContainer}>
//               <Text>{msg}</Text>
//             </View>
//           ))}
//         </View>
//         <KeyboardAvoidingView
//           style={styles.inputContainer}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           <TextInput
//             style={[styles.input, isInputFocused && styles.inputFocused]}
//             placeholder="Type your message..."
//             value={message}
//             onChangeText={setMessage}
//             onFocus={() => setInputFocused(true)}
//             onBlur={() => setInputFocused(false)}
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//             <Ionicons name="send" size={24} color="white" />
//           </TouchableOpacity>
//         </KeyboardAvoidingView>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     messagesContainer: {
//       flex: 1,
//       paddingVertical: 10,
//     },
//     messageContainer: {
//       paddingHorizontal: 10,
//       paddingVertical: 5,
//       backgroundColor: '#f0f0f0',
//       borderRadius: 8,
//       marginBottom: 5,
//     },
//     inputContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingHorizontal: 10,
//       borderTopWidth: 1,
//       borderTopColor: '#ccc',
//       paddingBottom: Platform.OS === 'ios' ? 10 : 0,
//     },
//     input: {
//       flex: 1,
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       backgroundColor: 'white', // Add a white background for iOS to prevent visual glitches
//       borderRadius: 20,
//       borderWidth: 1,
//       borderColor: '#ccc',
//     },
//     inputFocused: {
//       position: 'absolute',
//       bottom: '100%',
//     },
//     sendButton: {
//       backgroundColor: '#FFA500',
//       borderRadius: 20,
//       padding: 10,
//       marginLeft: 10,
//     },
//   });
  
//   export default Chat;
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview'; 

const Chat = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://tawk.to/chat/64db750694cf5d49dc6a85ab/1h7sk28c6' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

  