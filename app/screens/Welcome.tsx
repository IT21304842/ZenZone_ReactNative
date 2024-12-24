import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Welcome = ({ navigation }: any) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Welcome! Let’s set up an account for your child</Text>
      <Image
        source={require("../../assets/images/bee.png")}
        style={styles.image}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Sign Up Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Takes up the full screen
    justifyContent: "center", // Centers content vertically
    backgroundColor: "#FFFFFF", // Ensures no other color shows
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 41,
    width: 200,
    fontWeight: "bold",
    fontFamily: "Karla_700Bold",
    color: "#000", // Black color for the title
    textAlign: "left",
    marginLeft: 50, 
  },
  image: {
    width: 350,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20, // Space between image and button
    marginLeft : 50,
  },
  button: {
    backgroundColor: "#69D4DC",
    width: 300,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF", // White text
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Welcome;
