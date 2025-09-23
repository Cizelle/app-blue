import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const ProfileConfirmationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Icon name="check-circle-outline" size={100} color="#138D35" />
      <Text style={styles.confirmationTitle}>{t('profileConfirmation.title')}</Text>
      <Text style={styles.confirmationMessage}>
        {t('profileConfirmation.message')}
      </Text>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('ProfileHome')}
      >
        <Text style={styles.mainButtonText}>{t('profileConfirmation.button')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  confirmationMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  mainButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProfileConfirmationScreen;