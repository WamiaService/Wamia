import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const { link } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: link }}
       onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error:', nativeEvent);
      }} />
    </View>
  );
};

export default WebViewScreen;
