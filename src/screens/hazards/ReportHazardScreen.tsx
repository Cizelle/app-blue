/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const ReportHazardScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [hazardType, setHazardType] = useState('');
  const [description, setDescription] = useState('');

  // The final submission handler.
  const handleSubmit = () => {
    Alert.alert(t('reportHazard.submissionSuccessTitle'), t('reportHazard.submissionSuccessMessage'));
    navigation.goBack(); // Navigate back after submission
  };

  // This will now be a dummy function since submission is immediate
  const handleMediaUpload = () => {
    // You can add a simple confirmation or nothing at all
    Alert.alert("Media Uploaded", "Your media has been uploaded successfully.");
  };

  const hazardTypes = [
    t('reportHazard.hazardTypes.fire'),
    t('reportHazard.hazardTypes.flood'),
    t('reportHazard.hazardTypes.earthquake'),
    t('reportHazard.hazardTypes.landslide'),
    t('reportHazard.hazardTypes.other'),
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('reportHazard.headerTitle')}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>{t('reportHazard.locationLabel')}</Text>
        {/* Render location directly in the return statement */}
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={24} color="#138D35" style={styles.locationIcon} />
          <Text style={styles.locationText}>{t('reportHazard.locationText')}</Text>
        </View>

        <Text style={styles.inputLabel}>{t('reportHazard.hazardTypeLabel')}</Text>
        <View style={styles.selectorContainer}>
          {hazardTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.selectorButton,
                hazardType === type && styles.selectorButtonActive,
              ]}
              onPress={() => setHazardType(type)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  hazardType === type && styles.selectorButtonTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>{t('reportHazard.descriptionLabel')}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          placeholder={t('reportHazard.descriptionPlaceholder')}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.inputLabel}>{t('reportHazard.mediaLabel')}</Text>
        <TouchableOpacity style={styles.mediaButton} onPress={handleMediaUpload}>
          <Icon name="camera" size={20} color="#138D35" />
          <Text style={styles.mediaButtonText}>{t('reportHazard.mediaButtonText')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={handleSubmit}>
          <Text style={styles.reportButtonText}>{t('reportHazard.reportButtonText')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 5,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d4edda',
  },
  locationIcon: {
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#138D35',
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectorButton: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: '30%',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#D4EDDA',
    borderColor: '#138D35',
  },
  selectorButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  selectorButtonTextActive: {
    color: '#138D35',
  },
  mediaButton: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d4edda',
  },
  mediaButtonText: {
    fontSize: 16,
    color: '#138D35',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  reportButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#138D35',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ReportHazardScreen;