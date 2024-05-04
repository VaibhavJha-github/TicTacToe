import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export const Credit = () => {
    const navigation = useNavigation();

    // Hard-coded rules of Tic Tac Toe
    const rulesText = `
In the realm of X's and O's, upon the grid they go,
Where two contenders face off, in tic-tac-toe.
A pencil mark, a battle stark, lines cross like ancient runes,
Each player seeks, with tactic sleek, to align their threes and twos.
    
First goes X, with hopes to vex, in the corner she resides,
Then O's response, a parry, a taunt, beside the X she slides.
The square becomes a battleground, where silent warriors clash,
With every mark, they leave their spark, in this timeless match.
    
A diagonal attempt, an intercept, the X's make their claim,
But O is shrewd, not easily subdued, and blocks the path to fame.
They dance in turns, the board it churns with symbols old as time,
A line unbroken, a token, a sign, of a subline.
    `;

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Credits</Text>
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