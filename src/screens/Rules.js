import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Rules = () => {
    const navigation = useNavigation();

    // Hard-coded rules of Tic Tac Toe
    const rulesText = `
You probably already know how to play Tic-Tac-Toe. It's a really simple game, right? That's what most people think.
    
But if you really wrap your brain around it, you'll discover that Tic-Tac-Toe isn't quite as simple as you think
    
Rules for Tic-Tac-Toe
    
1. The game is played on a grid that's 3 squares by 3 squares.
    
2. You are X, your friend (or the computer in this case) is 0. Players take turns putting their marks in empty squares.
    
3. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.
    
4. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.
    `;

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Rules</Text>
                </View>
                {/* Displaying the rules */}
                <View style={styles.rulesContainer}>
                    <Text style={styles.rulesText}>{rulesText}</Text>
                </View>
                {/* Back button */}
                <TouchableOpacity style={styles.buttonContainer} onPress={handleBack}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    titleContainer: {
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 0, // Adjusted to 0 for top alignment
        marginBottom: 20, // Adjusted margin for better spacing
        width: '100%', // Adjusted to full width
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rulesContainer: {
        backgroundColor: 'darkgrey', // Dark grey background for the rules text box
        padding: 10,
        marginTop: 20, // Adjust as needed
        borderRadius: 5,
    },
    rulesText: {
        color: 'white', // White text color
        textAlign: 'left', // Align text to the left
    },
    buttonContainer: {
        alignSelf: 'center', // Center the button horizontally
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
