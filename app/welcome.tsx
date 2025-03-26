// app/welcome.tsx
import { View, Text, Button } from 'react-native';
import { logoutUser } from '../firebase/authService';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const handleLogout = async () => {
    await logoutUser();
    router.replace('/login');
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 24 }}>¡Bienvenido al restaurante!</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}
