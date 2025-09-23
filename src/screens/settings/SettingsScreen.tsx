import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const [isEmergencyAlertsEnabled, setEmergencyAlertsEnabled] = React.useState(true);
  const [isHazardReportsEnabled, setHazardReportsEnabled] = React.useState(true);
  const [isFamilyUpdatesEnabled, setFamilyUpdatesEnabled] = React.useState(true);
  const [isSystemUpdatesEnabled, setSystemUpdatesEnabled] = React.useState(false);
  const [isCommunityNewsEnabled, setCommunityNewsEnabled] = React.useState(true);

  const [isLocationPermissionEnabled, setLocationPermissionEnabled] = React.useState(true);
  const [isCameraPermissionEnabled, setCameraPermissionEnabled] = React.useState(false);
  const [isNotificationsPermissionEnabled, setNotificationsPermissionEnabled] = React.useState(true);
  const [isMicrophonePermissionEnabled, setMicrophonePermissionEnabled] = React.useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('settings.header.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('settings.header.subtitle')}</Text>
        </View>

        {/* Account Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('settings.account.title')}</Text>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.account.editProfile.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.account.editProfile.subtext')}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.account.emergencyContacts.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.account.emergencyContacts.subtext')}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.account.medicalInfo.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.account.medicalInfo.subtext')}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('settings.notifications.title')}</Text>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.notifications.emergencyAlerts.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.notifications.emergencyAlerts.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setEmergencyAlertsEnabled}
              value={isEmergencyAlertsEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isEmergencyAlertsEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.notifications.hazardReports.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.notifications.hazardReports.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setHazardReportsEnabled}
              value={isHazardReportsEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isHazardReportsEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.notifications.familyUpdates.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.notifications.familyUpdates.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setFamilyUpdatesEnabled}
              value={isFamilyUpdatesEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isFamilyUpdatesEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.notifications.systemUpdates.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.notifications.systemUpdates.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setSystemUpdatesEnabled}
              value={isSystemUpdatesEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isSystemUpdatesEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.notifications.communityNews.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.notifications.communityNews.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setCommunityNewsEnabled}
              value={isCommunityNewsEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isCommunityNewsEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
        
        {/* App Permissions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('settings.permissions.title')}</Text>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.permissions.location.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.permissions.location.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setLocationPermissionEnabled}
              value={isLocationPermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isLocationPermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.permissions.camera.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.permissions.camera.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setCameraPermissionEnabled}
              value={isCameraPermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isCameraPermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.permissions.notifications.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.permissions.notifications.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setNotificationsPermissionEnabled}
              value={isNotificationsPermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isNotificationsPermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.permissions.microphone.text')}</Text>
              <Text style={styles.listItemSubText}>{t('settings.permissions.microphone.subtext')}</Text>
            </View>
            <Switch
              onValueChange={setMicrophonePermissionEnabled}
              value={isMicrophonePermissionEnabled}
              trackColor={{ false: '#767577', true: '#138D35' }}
              thumbColor={isMicrophonePermissionEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Language Settings Section - New Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('settings.language.title')}</Text>
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemText}>{t('settings.language.changeLanguage')}</Text>
            </View>
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
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemContent: {
    flex: 1,
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  listItemSubText: {
    fontSize: 12,
    color: '#999',
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 10,
  },
  picker: {
    width: '100%',
    height: 40,
  },
});

export default SettingsScreen;