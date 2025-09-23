import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ChooseRoleScreen from './src/screens/auth/ChooseRoleScreen';
import MainDrawerNavigator from './src/navigation/MainTabNavigator';
import './src/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the User interface here since it's only used in App.tsx now
interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'official' | 'analyst';
}

export type RootStackParamList = {
  // Update the Login screen to accept the onLogin function
  Login: { onLogin: (user: User) => void };
  ChooseRole: undefined;
  Register: { role: 'citizen' | 'official' | 'analyst' };
  MainTabs: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to load user from storage:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStoredUser();
  }, []);

  if (isLoading) {
    return null; // Or a splash screen component
  }

  // Define the authentication handler functions
  const authProps = {
    onLogin: (userData: User) => {
      setUser(userData);
      AsyncStorage.setItem('user', JSON.stringify(userData));
    },
    onLogout: () => {
      setUser(null);
      AsyncStorage.removeItem('user');
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // User is logged in, show MainTabs
          <Stack.Screen
            name="MainTabs"
            component={MainDrawerNavigator}
            initialParams={{ user: user }} // Pass the entire user object
          />
        ) : (
          // No user is logged in, show auth screens
          <>
            <Stack.Screen
              name="Login"
              // The 'component' prop is the preferred way to render screens.
              // We'll use initialParams to pass the onLogin function.
              component={LoginScreen}
              initialParams={{ onLogin: authProps.onLogin }}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;