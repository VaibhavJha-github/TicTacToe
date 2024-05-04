import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveGame = async (id, result, steps, date, time, board, moves) => {
  try {
    const gameData = {
      id: id,
      result: result,
      steps: steps,
      date: date,
      time: time,
      board: board,
      moves: moves,
    };
    await AsyncStorage.setItem(`game_${id}`, JSON.stringify(gameData));
    console.log(`Game with ID ${id} saved successfully!`);
  } catch (error) {
    console.error('Error saving game:', error);
  }
};


