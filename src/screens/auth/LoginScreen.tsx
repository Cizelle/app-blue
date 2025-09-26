import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ====================================================================
// Define the TypeScript types for the API response data
// ====================================================================

// Define the shape of the user object from the API
interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'official' | 'analyst';
}

// Define the shape of the tokens object
interface ApiTokens {
  access?: {
    token: string;
    expires: string;
  };
  refresh?: {
    token: string;
    expires: string;
  };
}

// Define the shape of a successful login response
interface LoginSuccessResponse {
  user: ApiUser;
  tokens: ApiTokens;
}

// Define the shape of a failed login response
interface LoginErrorResponse {
  message: string;
}

// ====================================================================
// Define the component props
// ====================================================================

// Extend the standard navigation props with the custom 'onLogin' prop
type Props = NativeStackScreenProps<RootStackParamList, 'Login'> & {
  onLogin: (user: ApiUser) => void;
};

// ====================================================================
// Type Guard Functions
// ====================================================================

// Checks if the unknown data matches the LoginSuccessResponse shape
function isLoginSuccessResponse(data: unknown): data is LoginSuccessResponse {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const typedData = data as Record<string, unknown>;
  return (
    'user' in typedData &&
    typeof typedData.user === 'object' &&
    typedData.user !== null &&
    'id' in typedData.user &&
    'email' in typedData.user &&
    'name' in typedData.user &&
    'tokens' in typedData &&
    typeof typedData.tokens === 'object' &&
    typedData.tokens !== null
  );
}

// Checks if the unknown data matches the LoginErrorResponse shape
function isLoginErrorResponse(data: unknown): data is LoginErrorResponse {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  return 'message' in (data as Record<string, unknown>);
}

// ====================================================================
// The LoginScreen Component
// ====================================================================

const LoginScreen: React.FC<Props> = ({ navigation, onLogin }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  function isLoginSuccessResponse(data: any): data is {
    user: any;
    tokens: {
      access: {
        token: string;
        expires: string;
      };
    };
  } {
    return (
      typeof data === 'object' &&
      data !== null &&
      'user' in data &&
      'tokens' in data &&
      typeof data.tokens?.access?.token === 'string' &&
      typeof data.tokens?.access?.expires === 'string'
    );
  }

  const API_BASE_URL = 'http://192.168.0.108:5000/api/v1';

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert(t('login.alert.failedTitle'), t('login.alert.emptyFields'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });

      const responseData: unknown = await response.json();
      console.log('Login API Response:', responseData);

      if (!response.ok) {
        if (isLoginErrorResponse(responseData)) {
          throw new Error(
            responseData.message || 'Login failed. Check your credentials.',
          );
        } else {
          throw new Error('An unexpected error occurred. Please try again.');
        }
      }

      if (isLoginSuccessResponse(responseData)) {
        const { user, tokens } = responseData;

        await AsyncStorage.setItem('userData', JSON.stringify(user));

        if (tokens?.access?.token) {
          await AsyncStorage.setItem('authToken', tokens.access.token);
        }

        onLogin(user);
      } else {
        console.warn('Unexpected login response shape:', responseData);
        throw new Error('Unexpected data format received from the server.');
      }
    } catch (err: any) {
      console.warn('Login error raw:', err);

      let errorMessage = 'An unexpected error occurred.';

      if (err instanceof Error && err.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      Alert.alert(t('login.alert.failedTitle'), errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <AppHeader title={t('login.header.title')} subtitle={t('login.header.subtitle')} />
      <Text style={styles.welcomeText}>{t('login.welcome')}</Text>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>{t('login.usernameLabel')} *</Text>
        <TextInput
          style={styles.input}
          placeholder={t('login.usernamePlaceholder')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.inputLabel}>{t('login.passwordLabel')} *</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
            <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#777" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>{t('login.forgotPassword')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainButton} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.mainButtonText}>{t('login.mainButton')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthButton}>
          <Icon name="google" size={20} color="#DA4831" style={styles.oauthIcon} />
          <Text style={styles.oauthText}>{t('login.googleButton')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.otpButton}>
          <Icon name="message-text" size={20} color="#FFBF00" style={styles.oauthIcon} />
          <Text style={styles.otpText}>{t('login.otpButton')}</Text>
        </TouchableOpacity>
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>{t('login.noAccountText')} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ChooseRole')}>
            <Text style={styles.switchLink}>{t('login.registerLink')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.languagePickerContainer, styles.languagePickerBottom]}>
        <Text style={styles.languageLabel}>{t('settings.language.changeLanguage')}:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => changeLanguage(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={t('languages.english')} value="en" />
            <Picker.Item label={t('languages.hindi')} value="hi" />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  languagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  languagePickerBottom: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  languageLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 40,
    color: '#333',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
    width: '100%',
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    height: '100%',
  },
  passwordToggle: {
    padding: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#138D35',
    fontSize: 14,
  },
  mainButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  oauthButton: {
    flexDirection: 'row',
    width: "100%",
    padding: 12,
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 10,
  },
  oauthIcon: {
    marginRight: 10,
  },
  oauthText: {
    color: "#DA4831",
    fontWeight: "700",
    fontSize: 16,
  },
  otpButton: {
    flexDirection: 'row',
    width: "100%",
    padding: 12,
    borderRadius: 8,
    borderColor: "#FFBF00",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpText: {
    color: "#FFBF00",
    fontWeight: "700",
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  switchText: {
    fontSize: 14,
    color: '#555',
  },
  switchLink: {
    color: '#138D35',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default LoginScreen;