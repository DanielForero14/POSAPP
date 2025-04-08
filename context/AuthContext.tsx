// contexts/AuthContext.tsx
import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseFolder/firebaseConfig"; // Ajusta la ruta según tu estructura

interface UserData {
  email: string;
  name: string;
  role: "cliente" | "chef" | "cajero";
  createdAt: Date;
}

interface AuthContextInterface {
  currentUser: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: string }>;
  register: (email: string, password: string, name: string, role: "cliente" | "chef" | "cajero") => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
  updateUserRole: (role: "cliente" | "chef" | "cajero") => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface>({
  currentUser: null,
  userData: null,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => false,
  logout: async () => {},
  updateUserProfile: async () => {},
  updateUserRole: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            email: data.email,
            name: data.name,
            role: data.role,
            createdAt: data.createdAt.toDate()
          });
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          email: data.email,
          name: data.name,
          role: data.role,
          createdAt: data.createdAt.toDate()
        });
        return { success: true, role: data.role };
      }
      
      return { success: false };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: "cliente" | "chef" | "cajero"
  ) => {
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil con nombre
      await updateProfile(userCredential.user, { displayName: name });
      
      // Crear documento en Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        name,
        role,
        createdAt: new Date()
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUserProfile = async (name: string) => {
    if (!auth.currentUser) return;

    try {
      // Actualizar en Firebase Auth
      await updateProfile(auth.currentUser, { displayName: name });
      
      // Actualizar en Firestore
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name
      }, { merge: true });
      
      // Actualizar estado local
      if (userData) {
        setUserData({ ...userData, name });
      }
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  const updateUserRole = async (role: "cliente" | "chef" | "cajero") => {
    if (!auth.currentUser) return;

    try {
      // Actualizar solo el rol en Firestore
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        role
      }, { merge: true });
      
      // Actualizar estado local
      if (userData) {
        setUserData({ ...userData, role });
      }
    } catch (error) {
      console.error("Update role error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
        updateUserRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};