import {View, Text, StyleSheet } from "react-native";
import {Chess} from "./Chess";

export const Board = ({steps}) => {
    return(
        <View style={styles.board}>
            {steps.map((s,i) => (
                <Chess val = {s} key ={i}/>
                // <View style = {styles.box} key = {i}>
                //     {/* <Text style = {styles.chess} > {s}</Text> */}
                // </View>
            ))}
        </View>
    );
}
 
const styles = StyleSheet.create({
 
  board: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#FF9F1C",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignContent: "center",
  },

//   box: {
//     width: 80,
//     height: 80,
//     borderWidth: 1,
//     borderColor: "black",
//     backgroundColor: "green",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   chess: {
//     fontSize: 50,
//     color: "white",
//     fontWeight: "bold",
//   },




})