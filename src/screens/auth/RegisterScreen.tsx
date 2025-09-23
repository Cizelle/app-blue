import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoleSpecificFields from '../../components/RoleSpecificFields';
import { useTranslation } from 'react-i18next';
// FIX: Use your custom API client instead of Supabase
import apiClient from '../../api/client';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { role } = route.params;

  const [photo, setPhoto] = useState<string>();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [city, setCity] = useState('');
  const [stateText, setStateText] = useState('');
  const [country, setCountry] = useState('');
  const [designation, setDesignation] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [idProofUri, setIdProofUri] = useState<string>();
  const [authorizationLetterUri, setAuthorizationLetterUri] = useState<string>();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePhotoPick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets.length) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleNextStep = () => {
    if (
      !fullname ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      // !photo ||
      !city ||
      !stateText ||
      !country
    ) {
      return Alert.alert(
        t('register.alert.missingInfoTitle'),
        t('register.alert.missingInfoMessage'),
      );
    }
    if (password !== confirmPassword) {
      return Alert.alert(
        t('register.alert.passwordMismatchTitle'),
        t('register.alert.passwordMismatchMessage'),
      );
    }
    if (role === 'citizen') {
      handleFinalRegister();
    } else {
      setStep(2);
    }
  };

  const API_BASE_URL = 'http://192.168.0.108:5000/api/v1';
  interface ApiErrorResponse {
  message: string;
}

const handleFinalRegister = async () => {
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('city', city);
    formData.append('state', stateText);
    formData.append('country', country);
    formData.append('role', role);

    if (photo) {
      const filename = photo.split('/').pop();
      formData.append('profilePhoto', {
        uri: photo,
        name: filename,
        type: 'image/jpeg',
      } as any);
    }

    if (role !== 'citizen') {
      formData.append('designation', designation);
      formData.append('organizationName', organizationName);
      formData.append('employeeId', employeeId);

      if (idProofUri) {
        const filename = idProofUri.split('/').pop();
        formData.append('idProofDocument', {
          uri: idProofUri,
          name: filename,
          type: 'application/pdf',
        } as any);
      }

      if (authorizationLetterUri) {
        const filename = authorizationLetterUri.split('/').pop();
        formData.append('authorizationLetter', {
          uri: authorizationLetterUri,
          name: filename,
          type: 'application/pdf',
        } as any);
      }
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: formData as any, // FIX 1: Cast formData to 'any' to resolve the type conflict
    });

    if (!response.ok) {
      // FIX 2: Explicitly type the parsed error data
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(errorData.message || 'Registration failed.');
    }

    Alert.alert(
      t('register.alert.successTitle'),
      t('register.alert.successMessage', {
        fullname,
        role: t(`roles.${role}.title`),
      }),
    );
    
    navigation.navigate('Login');

  } catch (err: any) {
    console.log(err);
    const message =
      err.message || t('register.alert.errorDefault');
    Alert.alert(t('register.alert.errorTitle'), message);
  } finally {
    setLoading(false);
  }
};

  const headerSubtitle = t('register.header.subtitle', {
    role: t(`roles.${role}.title`),
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <AppHeader title={t('register.header.title')} subtitle={headerSubtitle} />
      <View style={styles.content}>
        {step === 1 && (
          <>
            <View style={styles.photoUploadContainer}>
              <TouchableOpacity onPress={handlePhotoPick}>
                <View style={styles.photoCircle}>
                  {photo ? (
                    <Image source={{ uri: photo }} style={styles.photoImg} />
                  ) : (
                    <Icon name="account-circle-outline" size={70} color="#999" />
                  )}
                </View>
                <View style={styles.uploadIconContainer}>
                  <Icon name="camera-plus" size={20} color="#138D35" />
                </View>
              </TouchableOpacity>
              <Text style={styles.uploadPhotoText}>
                {t('register.uploadPhoto')}
              </Text>
              <Text style={styles.requiredText}>
                ({t('register.required')})
              </Text>
            </View>

            <Text style={styles.inputLabel}>{t('register.fullName')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.fullNamePlaceholder')}
              value={fullname}
              onChangeText={setFullname}
              autoCapitalize="words"
            />
            <Text style={styles.inputLabel}>{t('register.email')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.inputLabel}>{t('register.phone')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.phonePlaceholder')}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Text style={styles.inputLabel}>{t('register.password')}</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder={t('register.passwordPlaceholder')}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputLabel}>{t('register.confirmPassword')}</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder={t('register.confirmPasswordPlaceholder')}
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                style={styles.passwordToggle}
              >
                <Icon
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputLabel}>{t('register.city')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.cityPlaceholder')}
              value={city}
              onChangeText={setCity}
            />
            <Text style={styles.inputLabel}>{t('register.state')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.statePlaceholder')}
              value={stateText}
              onChangeText={setStateText}
            />
            <Text style={styles.inputLabel}>{t('register.country')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('register.countryPlaceholder')}
              value={country}
              onChangeText={setCountry}
            />

            <TouchableOpacity
              style={styles.mainButton}
              onPress={handleNextStep}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.mainButtonText}>
                  {role === 'citizen'
                    ? t('register.registerButton')
                    : t('register.nextButton')}
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {step === 2 && role !== 'citizen' && (
          <>
            <RoleSpecificFields
              role={role as 'official' | 'analyst'}
              designation={designation}
              setDesignation={setDesignation}
              organizationName={organizationName}
              setOrganizationName={setOrganizationName}
              employeeId={employeeId}
              setEmployeeId={setEmployeeId}
              idProofUri={idProofUri}
              setIdProofUri={setIdProofUri}
              authorizationLetterUri={authorizationLetterUri}
              setAuthorizationLetterUri={setAuthorizationLetterUri}
            />

            <TouchableOpacity
              style={styles.mainButton}
              onPress={handleFinalRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.mainButtonText}>
                  {t('register.registerButton')}
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* OAuth & Switch To Login */}
        <TouchableOpacity style={styles.oauthButton}>
          <Icon
            name="google"
            size={20}
            color="#DA4831"
            style={styles.oauthIcon}
          />
          <Text style={styles.oauthText}>{t('register.googleButton')}</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>
            {t('register.haveAccountText')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchLink}>{t('register.loginLink')}</Text>
          </TouchableOpacity>
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
  content: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  photoUploadContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  photoImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#D4EDDA',
    borderRadius: 15,
    padding: 5,
  },
  uploadPhotoText: {
    fontSize: 14,
    color: '#138D35',
    fontWeight: '600',
    marginTop: 8,
  },
  requiredText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
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
  mainButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#138D35',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  oauthButton: {
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  oauthIcon: {
    marginRight: 10,
  },
  oauthText: {
    color: '#DA4831',
    fontWeight: '700',
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

export default RegisterScreen;