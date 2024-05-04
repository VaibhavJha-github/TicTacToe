import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rules } from './Rules';
import { Credit } from './Credit';
import { LoadGame } from './LoadGame';
import { loadGame } from '../datamodel/game';
import { saveGame } from '../datamodel/game';
import AsyncStorage from '@react-native-async-storage/async-storage';


const steps = ['', '', '', '', '', '', '', '', '']; // Updated to an empty board

function checkState(board) {
  // Check if 'X' or 'O' wins
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { status: `${board[a]} wins`, gameOver: true, winLine: condition }; // Include winLine in the return object
    }
  }

  // Check if it is a tie
  if (!board.includes('')) {
    return { status: 'It is a tie', gameOver: true, winLine: null }; // Set winLine to null for ties
  }

  // Check whose turn it is
  const xCount = board.filter(cell => cell === 'X').length;
  const oCount = board.filter(cell => cell === 'O').length;

  if (xCount === oCount) {
    return { status: 'X to play', gameOver: false, winLine: null }; // Set winLine to null if the game is still ongoing
  } else {
    return { status: 'O to play', gameOver: false, winLine: null }; // Set winLine to null if the game is still ongoing
  }

}


export const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { gameData } = route.params ?? {};
  
  const [gameList, setGameList] = useState([]);
  const [moves, setMoves] = useState([]);

  const [nextPlayer, setNextPlayer] = useState('X'); // State to track the next player
  const [currentMove, setCurrentMove] = useState(-1); // State to track current move for navigation
  const [gameStatus, setGameStatus] = useState('X to play'); // State for the game status message
  const [gameOver, setGameOver] = useState(false); // State to track if the game is over
  const [winLine, setWinLine] = useState(null);// Define winLine in the component state

  const [board, setBoard] = useState(gameData?.board ?? [...steps]); // Initialize board with gameData or steps

  useEffect(() => {
    if (gameData) {
      setBoard(gameData.board);
      setMoves(gameData.moves);
      setNextPlayer(gameData.moves.length % 2 === 0 ? 'X' : 'O');
      setGameOver(false);
    }
  }, [gameData]);
  

  const handleLoadGame = () => {
    navigation.navigate('LoadGame'); // Navigate to LoadGame screen
  };
  const gotoDetailHandler = () => {
    navigation.navigate('Rules');
  };

  const gotoCreditHandler = () => {
    navigation.navigate('Credit');
  };

  const handleMove = (index) => {
    if (!gameOver && board[index] === '' && checkState(board).status === `${nextPlayer} to play`) {
      const updatedBoard = [...board];
      updatedBoard[index] = nextPlayer;
      setBoard(updatedBoard);
      setMoves([...moves.slice(0, currentMove + 1), index]);
      setNextPlayer(nextPlayer === 'X' ? 'O' : 'X'); // Switch to the next player
      setCurrentMove(currentMove + 1);
  
      const { status, gameOver, winLine } = checkState(updatedBoard); // Update winLine when a win occurs
      setGameStatus(status);
      setGameOver(gameOver);
      setWinLine(winLine);
    }
  };
  


  const handleNewGame = () => {
    if (gameData) {
      navigation.navigate('Home'); // Navigate back to Home screen without resetting board and moves
    } else {
      setMoves([]);
      setBoard([...steps]); // Resetting the game board
      setNextPlayer('X'); // Resetting the next player to 'X'
      setCurrentMove(0);
      setGameOver(false);
    }
  };
  

  const handleBackward = () => {
    if (!gameOver && currentMove >= 0) {
      setCurrentMove(currentMove - 1);
      const updatedBoard = [...steps];
      for (let i = 0; i <= currentMove - 1; i++) {
        updatedBoard[moves[i]] = i % 2 === 0 ? 'X' : 'O';
      }
      setBoard(updatedBoard);
      setNextPlayer(currentMove % 2 === 0 ? 'X' : 'O');
      setGameOver(false); // Update gameOver to false when going backward
    }
  };
  
  const handleForward = () => {
    if (!gameOver && currentMove < moves.length - 1) {
      setCurrentMove(currentMove + 1);
      const updatedBoard = [...steps];
      for (let i = 0; i <= currentMove; i++) {
        updatedBoard[moves[i]] = i % 2 === 0 ? 'X' : 'O';
      }
      setBoard(updatedBoard);
      setNextPlayer((currentMove + 1) % 2 === 0 ? 'X' : 'O');
      setGameOver(false); // Update gameOver to false when going forward
    }
  };

  const handleSave = () => {
    Alert.alert(
      'Save Game',
      'Are you sure you want to save the game?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: () => {
            const id = Date.now(); // Generate unique ID for the game
            const result = gameStatus.includes('wins') ? gameStatus : 'Tie';
            const steps = moves.length;
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();
            saveGame(id, result, steps, date, time, board, moves); // Pass board and moves to saveGame
            handleNewGame(); // Initiate a new game session after saving
            loadGameList(); // Reload the game list after saving
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  const loadGameList = async () => {
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
    loadGameList(); // Load the game list on component mount
  }, []);


  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tic Tac Toe</Text>
      </View>
      <View style={styles.statusLabelContainer}>
        <Text style={styles.statusLabel}>{gameStatus}</Text>
      </View>
      <View style={styles.buttonContainer}>
      <Pressable style={[styles.button, currentMove <= 0 && styles.disabledButton]} onPress={handleBackward} disabled={currentMove <= 0}>
        <Text style={styles.buttonText}>{"<"}</Text>
      </Pressable>
      <Pressable style={[styles.button, currentMove === -1 && styles.disabledButton]} onPress={handleNewGame} disabled={currentMove === -1}>
        <Text style={styles.buttonText}>New Game</Text>
      </Pressable>
      <Pressable style={[styles.button, currentMove >= moves.length - 1 && styles.disabledButton]} onPress={handleForward} disabled={currentMove >= moves.length - 1}>
        <Text style={styles.buttonText}>{">"}</Text>
      </Pressable>
      
    </View>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <Pressable
          key={index}
          style={[
            styles.box,
            gameStatus.includes('wins') && gameStatus.includes(cell) && winLine && winLine.includes(index)
              ? cell === 'X'
                ? styles.winningX
                : styles.winningO
              : board.includes('')
              ? cell === 'X'
                ? styles.xCell
                : styles.oCell
              : styles.box,
          ]}
          onPress={() => handleMove(index)}
          disabled={moves.includes(index) || cell !== ''}
        >
          <Text style={styles.chess}>{cell}</Text>
        </Pressable>
        
        ))}
      </View>

      <View style={styles.rulesCreditContainer}>
      <View style={styles.rulesCreditContainer}>
      <Pressable style={[styles.button, styles.loadButton]} onPress={handleLoadGame}>
        <Text style={styles.buttonText}>Load</Text>
      </Pressable>
      <Pressable style={[styles.button, gameOver && styles.saveButton, !gameOver && styles.disabledSaveButton]} disabled={!gameOver} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={gotoDetailHandler}>
        <Text style={styles.buttonText}>Rules</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={gotoCreditHandler}>
        <Text style={styles.buttonText}>Credit</Text>
      </Pressable>
      
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  board: {
    marginTop: -90,
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'darkorange',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    padding: 10,
  },
  box: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winningCell: {
    backgroundColor: 'yellow', 
  },
  chess: {
    fontSize: 50,
    color: 'white', 
    fontWeight: 'bold',
  },
  rulesCreditContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40, 
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 100,
  },
  disabledSaveButton: {
    backgroundColor: 'grey',
  },
  saveButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  statusLabel: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusLabelContainer: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    marginTop: 20,
    width: 300,
    marginBottom: 10, 
  },
  
  xCell: {
    backgroundColor: 'green',
    color: 'yellow', 
  },
  oCell: {
    backgroundColor: 'green',
  },
  winningX: {
    backgroundColor: 'red', 
    color: 'white', 
  },
  winningO: {
    backgroundColor: 'yellow', 
    color: 'black', 
  },

  
});


export default Home;