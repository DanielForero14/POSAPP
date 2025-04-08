  import React, { useState, useContext } from "react";
  import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
  import { useRouter } from "expo-router";
  import { AuthContext } from "../context/AuthContext";

  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { login, loading: authLoading } = useContext(AuthContext);

    const handleLogin = async () => {
      if (!email.trim() || !password.trim()) {
        setError("Por favor completa todos los campos");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const { success, role } = await login(email, password);
        
        if (success) {
          // Redirigir según el rol
          switch (role) {
            case "cliente":
              router.replace("/Screens/cliente");
              break;
            case "chef":
              router.replace("/Screens/chefs");
              break;
            case "cajero":
              router.replace("/Screens/cajero");
              break;
            default:
              Alert.alert("Error", "Rol no reconocido");
          }
        } else {
          setError("Credenciales incorrectas");
        }
      } catch (err) {
        setError("Ocurrió un error al iniciar sesión");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (authLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.link}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "#fff",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
    },
    button: {
      backgroundColor: "#007bff",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginBottom: 15,
    },
    link: {
      marginTop: 20,
      alignItems: "center",
    },
    linkText: {
      color: "#007bff",
      fontSize: 16,
    },
  });

  export default LoginScreen;