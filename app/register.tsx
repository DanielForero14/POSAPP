import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseFolder/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("cliente");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validateFields = () => {
    if (!email.trim() || !password.trim() || !name.trim()) {
      setErrorMessage("Todos los campos son obligatorios");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;
    
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        name,
        role,
        createdAt: new Date().toISOString()
      });

      // Redirigir automáticamente a login después de registro exitoso
      router.replace("/login");

    } catch (error: any) {
      setErrorMessage("Error al registrar. Verifica tus datos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre completo *"
        style={styles.input}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Correo electrónico *"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña (mínimo 6 caracteres) *"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Selecciona tu rol:</Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Cliente" value="cliente" />
        <Picker.Item label="Chef" value="chef" />
        <Picker.Item label="Cajero" value="cajero" />
      </Picker>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Button 
        title={isLoading ? "Registrando..." : "Crear cuenta"} 
        onPress={handleRegister} 
        disabled={isLoading}
      />

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.push("/login")}
      >
        <Text style={styles.backButtonText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
    color: '#444',
  },
  picker: {
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
});