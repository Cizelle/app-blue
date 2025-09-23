import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseRole'>;

const ChooseRoleScreen: React.FC<Props> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  const handleRegisterPress = (role: 'citizen' | 'official' | 'analyst') => {
    navigation.navigate('Register', { role });
  };

  const roles = [
    {
      id: 'citizen',
      icon: 'account-group',
      title: t('roles.citizen.title'),
      description: t('roles.citizen.description'),
      features: [
        t('roles.citizen.features.reportHazards'),
        t('roles.citizen.features.submitSOS'),
        t('roles.citizen.features.trackFamily'),
        t('roles.citizen.features.makeDonations'),
        t('roles.citizen.features.emergencyDrills'),
      ],
    },
    {
      id: 'official',
      icon: 'shield-check',
      title: t('roles.official.title'),
      description: t('roles.official.description'),
      features: [
        t('roles.official.features.validateReports'),
        t('roles.official.features.manageHotspots'),
        t('roles.official.features.emergencyResponse'),
        t('roles.official.features.resourceAllocation'),
      ],
    },
    {
      id: 'analyst',
      icon: 'chart-bar',
      title: t('roles.analyst.title'),
      description: t('roles.analyst.description'),
      features: [
        t('roles.analyst.features.socialMediaMonitoring'),
        t('roles.analyst.features.trendAnalysis'),
        t('roles.analyst.features.dataInsights'),
        t('roles.analyst.features.generateReports'),
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Language Picker */}
      <View style={styles.languagePickerContainer}>
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

      <View style={styles.header}>
        <Text style={styles.mainTitle}>{t('roles.chooseRole')}</Text>
        <Text style={styles.subtitle}>{t('roles.selectRoleDesc')}</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <View key={role.id} style={styles.roleCard}>
            <View style={styles.iconContainer}>
              <Icon name={role.icon} size={40} color="#138D35" />
            </View>
            <Text style={styles.roleTitle}>{role.title}</Text>
            <Text style={styles.roleDescription}>{role.description}</Text>
            <Text style={styles.keyFeaturesTitle}>{t('roles.keyFeaturesTitle')}</Text>
            {role.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => handleRegisterPress(role.id as 'citizen' | 'official' | 'analyst')}
            >
              <Text style={styles.registerButtonText}>{t('roles.registerButton', { role: role.title })}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
    alignItems: 'center',
  },
  languagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
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
  header: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  rolesContainer: {
    width: '90%',
    maxWidth: 400,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderColor: '#D4EDDA',
    borderWidth: 1,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#D4EDDA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  keyFeaturesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#138D35',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#138D35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChooseRoleScreen;