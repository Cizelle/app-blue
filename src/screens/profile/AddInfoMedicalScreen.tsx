import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const AddInfoMedicalScreen = ({ route }: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [allergies, setAllergies] = useState('');
  const [disabilities, setDisabilities] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [hospitalNames, setHospitalNames] = useState('');
  const [pastMedicalRecord, setPastMedicalRecord] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [medicalReportsFile, setMedicalReportsFile] = useState('');

  const { personalData } = route.params;

  const handleComplete = () => {
    // Basic validation
    if (!bloodGroup) {
      Alert.alert(t('medical.alert.incompleteTitle'), t('medical.alert.incompleteMessage'));
      return;
    }
    const medicalData = { allergies, disabilities, bloodGroup, hospitalNames, pastMedicalRecord, medicalReportsFile };
    const fullProfileData = { ...personalData, ...medicalData };
    console.log('Full Profile Data:', fullProfileData);
    
    // Simulate API call to save data
    Alert.alert(t('medical.alert.successTitle'), t('medical.alert.successMessage'));
    navigation.navigate('ProfileConfirmation');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('medical.headerTitle')}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>{t('medical.form.bloodGroupLabel')}</Text>
        <View style={styles.selectorContainer}>
          {bloodGroups.map((group) => (
            <TouchableOpacity
              key={group}
              style={[styles.selectorButton, bloodGroup === group && styles.selectorButtonActive]}
              onPress={() => setBloodGroup(group)}
            >
              <Text style={[styles.selectorButtonText, bloodGroup === group && styles.selectorButtonTextActive]}>{group}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>{t('medical.form.allergiesLabel')}</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder={t('medical.form.allergiesPlaceholder')}
          multiline
          value={allergies}
          onChangeText={setAllergies}
        />

        <Text style={styles.inputLabel}>{t('medical.form.disabilitiesLabel')}</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder={t('medical.form.disabilitiesPlaceholder')}
          multiline
          value={disabilities}
          onChangeText={setDisabilities}
        />
        
        <Text style={styles.inputLabel}>{t('medical.form.pastMedicalRecordsLabel')}</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder={t('medical.form.pastMedicalRecordsPlaceholder')}
          multiline
          value={pastMedicalRecord}
          onChangeText={setPastMedicalRecord}
        />

        <Text style={styles.inputLabel}>{t('medical.form.hospitalNamesLabel')}</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder={t('medical.form.hospitalNamesPlaceholder')}
          multiline
          value={hospitalNames}
          onChangeText={setHospitalNames}
        />

        <Text style={styles.inputLabel}>{t('medical.form.medicalReportsLabel')}</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="upload" size={20} color="#138D35" />
          <Text style={styles.uploadText}>{t('medical.form.uploadButtonText')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={handleComplete}>
          <Text style={styles.mainButtonText}>{t('medical.form.saveButtonText')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  content: { padding: 20 },
  inputLabel: { width: '100%', color: '#333', fontSize: 14, fontWeight: '500', marginBottom: 5, marginTop: 15 },
  descriptionInput: {
    height: 80, backgroundColor: '#f6f6f6', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, marginBottom: 10,
  },
  selectorContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  selectorButton: {
    backgroundColor: '#f6f6f6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 15, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0', minWidth: '22%', alignItems: 'center'
  },
  selectorButtonActive: { backgroundColor: '#D4EDDA', borderColor: '#138D35' },
  selectorButtonText: { fontSize: 14, color: '#333', fontWeight: '600' },
  selectorButtonTextActive: { color: '#138D35' },
  uploadButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F9F0', borderWidth: 1, borderColor: '#138D35', borderRadius: 8, padding: 15, marginTop: 10
  },
  uploadText: { marginLeft: 10, color: '#138D35', fontWeight: 'bold' },
  mainButton: {
    width: "100%", padding: 15, backgroundColor: "#138D35", borderRadius: 8, alignItems: "center", marginTop: 20, marginBottom: 15,
  },
  mainButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});

export default AddInfoMedicalScreen;