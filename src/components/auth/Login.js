import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function LoginScreen({ onLogin, navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.23:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.data.token);
        Alert.alert("Success", "Login successful!");
      } else {
        Alert.alert("Error", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="cat" size={80} color="#FF6B6B" style={styles.icon} />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FDF3E3",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FF6B6B",
    fontFamily: "Poppins",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFADAD",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontFamily: "Poppins",
  },
  button: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  registerText: {
    color: "",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});
