import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { loadGame } from '../datamodel/game';

const savedGames = [
  { id: 1, name: 'Game 1' },
  { id: 2, name: 'Game 2' },
  { id: 3, name: 'Game 3' },
];

export const LoadGame = () => {
    const navigation = useNavigation();
    const [gameList, setGameList] = useState([]);
  
    const loadGames = async () => {
      // Load the game list from AsyncStorage
      try {
        const keys = await AsyncStorage.getAllKeys();
        const games = await AsyncStorage.multiGet(keys);
        setGameList(games.map((game) => JSON.parse(game[1])));
      } catch (error) {
        console.error('Error loading game list:', error);
      }
    };
  
    useEffect(() => {
      loadGames(); // Load the game list on component mount
    }, []);
  
    const handleDelete = (id) => {
      Alert.alert(
        'Delete Game',
        'Are you sure you want to delete this game?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              // Delete the game from AsyncStorage
              try {
                await AsyncStorage.removeItem(`game_${id}`);
                loadGames(); // Reload the game list after deletion
              } catch (error) {
                console.error('Error deleting game:', error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    };

    const handleLoad = (id) => {
      const selectedGame = gameList.find((game) => game.id === id);
      if (selectedGame) {
        navigation.navigate('Home', { gameData: selectedGame }); // Pass loaded game data to Home screen
      } else {
        console.error('Game not found');
      }
    };
    

      
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Load Game</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {gameList.map((game) => (
          <View key={game.id} style={styles.gameContainer}>
            <Text>ID: {game.id}</Text>
            <Text>Result: {game.result}</Text>
            <Text>Steps: {game.steps}</Text>
            <Text>Date: {game.date}</Text>
            <Text>Time: {game.time}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => handleDelete(game.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLoad(game.id)}>
                <Text style={styles.buttonText}>Load</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  titleContainer: {
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20, 
    marginTop: 10, 
    width: '90%', 
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  scrollContainer: {
    width: '80%',
    maxHeight: '100%', 
  },
  gameContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgrey', 
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '45%', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoadGame;
