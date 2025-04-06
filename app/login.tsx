import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseFolder/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const role = userDoc.data().role;

        if (role === "cliente") {
          router.push("./screens/cliente");
        } else if (role === "cajero") {
          router.push("./screens/cajero");
        } else if (role === "chef") {
          router.push("./screens/chef");
        } else {
          Alert.alert("Rol no reconocido");
        }
      } else {
        Alert.alert("No se encontró el usuario en Firestore");
      }
    } catch (error: any) {
      Alert.alert("Error al iniciar sesión", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  linkText: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
});
