import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Home } from './src/screen/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
