// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; // Remove Image from here
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/MainTabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

const ProfileScreen: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  // Placeholder data for demonstration
  const user = {
    name: 'Ipshita Das',
    email: 'ipshita.das@example.com',
    phone: '+91 98765 43210',
  };

  const notProvidedStatus = t('profile.status.notProvided');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile.headerTitle')}</Text>
      </View>

      <View style={styles.profileCard}>
        {/* FIX: Use a placeholder icon instead of an image */}
        <View style={styles.profileIconContainer}>
            <Icon name="account-circle" size={80} color="#666" />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.detailText}>{user.email}</Text>
          <Text style={styles.detailText}>{user.phone}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('AddPersonal')}
      >
        <Text style={styles.mainButtonText}>{t('profile.addButtonText')}</Text>
      </TouchableOpacity>

      {/* Placeholder for other details that will be filled in */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>{t('profile.sections.personal.title')}</Text>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>{t('profile.sections.personal.dobLabel')}{notProvidedStatus}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="gender-male-female" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>{t('profile.sections.personal.genderLabel')}{notProvidedStatus}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="map-marker-outline" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>{t('profile.sections.personal.addressLabel')}{notProvidedStatus}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>{t('profile.sections.medical.title')}</Text>
        <View style={styles.infoRow}>
          <Icon name="hospital-box-outline" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>{t('profile.sections.medical.bloodGroupLabel')}{notProvidedStatus}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="needle" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoRowText}>{t('profile.sections.medical.allergiesLabel')}{notProvidedStatus}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Light background for the icon
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  mainButton: {
    width: "90%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: 'center',
    marginVertical: 15,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoRowText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileScreen;