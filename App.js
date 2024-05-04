// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/screens/Home';
import { Rules } from './src/screens/Rules';
import { Credit } from './src/screens/Credit';
import { LoadGame } from './src/screens/LoadGame';
import { useNavigation, useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} initialParams={{ gameData: null }} />
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Credit" component={Credit} /> 
        <Stack.Screen name="LoadGame" component={LoadGame} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
