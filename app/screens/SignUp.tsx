import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_APP } from "@/FirebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

const SignUp = ({ navigation }: any) => {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relation, setRelation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    if (!childName.trim()) {
      Alert.alert("Validation Error", "Child name is required.");
      return false;
    }
    if (!childAge.trim() || isNaN(Number(childAge)) || Number(childAge) <= 0) {
      Alert.alert("Validation Error", "Child age must be a positive number.");
      return false;
    }
    if (!parentName.trim()) {
      Alert.alert("Validation Error", "Parent name is required.");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Validation Error", "Enter a valid email address.");
      return false;
    }
    if (
      !phoneNumber.trim() ||
      !/^\d{10}$/.test(phoneNumber.replace(/[\s\-()]/g, ""))
    ) {
      Alert.alert("Validation Error", "Enter a valid 10-digit phone number.");
      return false;
    }
    if (!relation.trim()) {
      Alert.alert("Validation Error", "Relation to child is required.");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long."
      );
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      // Get user ID (UID)
      const userId = userCredential.user.uid;

      // Save user data to Firebase Realtime Database
      const db = getDatabase(FIREBASE_APP);
      const userRef = ref(db, "users/" + userId);

      await set(userRef, {
        childName,
        childAge,
        parentName,
        email,
        phoneNumber,
        relation,
      });

      Alert.alert("Success", "Account created successfully and data saved!");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up !</Text>
      <Text style={styles.subHeader}>
        Create account by filling the form below.
      </Text>

     

      <Text style={styles.sectionHeader}>Child Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={childName}
        onChangeText={setChildName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={childAge}
        onChangeText={setChildAge}
        keyboardType="numeric"
      />

      <Text style={styles.sectionHeader}>Parents Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={parentName}
        onChangeText={setParentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter email (use this when login)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Relation to Child"
        value={relation}
        onChangeText={setRelation}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
       <Image source={require("../../assets/images/bee.png")} style={styles.image}/>
      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Do you already have an account?{" "}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")}
        >
          LOGIN
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  btncontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "Karla_700Bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "Karla_400Regular",
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginLeft : 250,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
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
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  loginText: {
    color: "#00C4CC",
    fontWeight: "bold",
  },
});

export default SignUp;
