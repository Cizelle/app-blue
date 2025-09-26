// src/screens/MissingPersonFinderScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the root stack navigator parameters
// This type is necessary for correct TypeScript usage with navigation
type RootStackParamList = {
  // Add the screen name for the missing person form here
  MissingPersonForm: undefined; // 'undefined' because it doesn't take any parameters
  // You would add other screens here, e.g., 'MissingPersonDetails: { id: string }'
};

// Define the navigation prop type for this screen
type MissingPersonFinderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MissingPersonForm'>;

// Define the component props, including the navigation prop
type Props = {
  navigation: MissingPersonFinderScreenNavigationProp;
};

const MissingPersonFinderScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('missingPerson.headerTitle')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('missingPerson.headerSubtitle')}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {/* Report Missing Person Button */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            // Navigate to the Missing Person Form screen
            navigation.navigate('MissingPersonForm');
          }}
        >
          <Icon name="account-search-outline" size={60} color="#e74c3c" style={styles.icon} />
          <Text style={styles.optionTitle}>{t('missingPerson.reportMissing.title')}</Text>
          <Text style={styles.optionDescription}>
            {t('missingPerson.reportMissing.description')}
          </Text>
        </TouchableOpacity>

        {/* Found Someone Button */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            // You could navigate to a separate screen for found persons,
            // but for now, we'll navigate to the same form
            navigation.navigate('MissingPersonForm');
          }}
        >
          <Icon name="check-decagram-outline" size={60} color="#27ae60" style={styles.icon} />
          <Text style={styles.optionTitle}>{t('missingPerson.foundSomeone.title')}</Text>
          <Text style={styles.optionDescription}>
            {t('missingPerson.foundSomeone.description')}
          </Text>
        </TouchableOpacity>
      </View>
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
  optionsContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MissingPersonFinderScreen;