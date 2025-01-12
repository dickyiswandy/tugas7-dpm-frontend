import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validasi input
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Validasi format email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Proses registrasi
    setLoading(true); // Tampilkan indikator loading
    try {
      const response = await fetch("http://192.168.1.11:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log("Server Response:", data); // Debugging respons server

      if (response.ok) {
        // Registrasi berhasil
        Alert.alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        // Registrasi gagal
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error); // Debugging error
      Alert.alert("Error", "Failed to connect to server. Please try again later.");
    } finally {
      setLoading(false); // Sembunyikan indikator loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#2464EC" />
      ) : (
        <Button title="Register" onPress={handleRegister} />
      )}

      {/* Navigasi kembali ke Login */}
      <View style={styles.loginContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}> Login</Text>
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
    backgroundColor: "#FFF8F1", // Warna pastel
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
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
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  loginText: {
    color: "#FF6B6B",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});

