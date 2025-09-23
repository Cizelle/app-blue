import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const genders = ['Male', 'Female', 'Other'];
const emotionalStatuses = ['NORMAL', 'STRESSED', 'ANXIOUS', 'CALM'];

const AddInfoPersonalScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [emotionalStatus, setEmotionalStatus] = useState('NORMAL');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  const handleNext = () => {
    // Basic validation
    if (!dob || !gender || !height || !weight || !address) {
      Alert.alert(t('personal.alert.incompleteTitle'), t('personal.alert.incompleteMessage'));
      return;
    }

    const personalData = {
      dob, gender, height, weight, address, city, state, country,
      emotionalStatus, emergencyContactName, emergencyContactPhone
    };
    navigation.navigate('AddMedical', { personalData });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('personal.headerTitle')}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>{t('personal.form.dobLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.dobPlaceholder')} value={dob} onChangeText={setDob} />

        <Text style={styles.inputLabel}>{t('personal.form.genderLabel')}</Text>
        <View style={styles.selectorContainer}>
          {genders.map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.selectorButton, gender === g && styles.selectorButtonActive]}
              onPress={() => setGender(g)}
            >
              <Text style={[styles.selectorButtonText, gender === g && styles.selectorButtonTextActive]}>{t(`personal.form.genders.${g.toLowerCase()}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>{t('personal.form.heightLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.heightPlaceholder')} keyboardType="numeric" value={height} onChangeText={setHeight} />

        <Text style={styles.inputLabel}>{t('personal.form.weightLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.weightPlaceholder')} keyboardType="numeric" value={weight} onChangeText={setWeight} />
        
        <Text style={styles.inputLabel}>{t('personal.form.addressLabel')}</Text>
        <TextInput style={styles.descriptionInput} placeholder={t('personal.form.addressPlaceholder')} multiline value={address} onChangeText={setAddress} />
        
        <Text style={styles.inputLabel}>{t('personal.form.cityLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.cityPlaceholder')} value={city} onChangeText={setCity} />

        <Text style={styles.inputLabel}>{t('personal.form.stateLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.statePlaceholder')} value={state} onChangeText={setState} />

        <Text style={styles.inputLabel}>{t('personal.form.countryLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.countryPlaceholder')} value={country} onChangeText={setCountry} />
        
        <Text style={styles.inputLabel}>{t('personal.form.emotionalStatusLabel')}</Text>
        <View style={styles.selectorContainer}>
          {emotionalStatuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.selectorButton, emotionalStatus === status && styles.selectorButtonActive]}
              onPress={() => setEmotionalStatus(status)}
            >
              <Text style={[styles.selectorButtonText, emotionalStatus === status && styles.selectorButtonTextActive]}>{t(`personal.form.emotionalStatuses.${status.toLowerCase()}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>{t('personal.form.emergencyContactNameLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.emergencyContactNamePlaceholder')} value={emergencyContactName} onChangeText={setEmergencyContactName} />
        
        <Text style={styles.inputLabel}>{t('personal.form.emergencyContactPhoneLabel')}</Text>
        <TextInput style={styles.input} placeholder={t('personal.form.emergencyContactPhonePlaceholder')} keyboardType="phone-pad" value={emergencyContactPhone} onChangeText={setEmergencyContactPhone} />

        <TouchableOpacity style={styles.mainButton} onPress={handleNext}>
          <Text style={styles.mainButtonText}>{t('personal.form.nextButton')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  content: { padding: 20 },
  inputLabel: {
    width: '100%', color: '#333', fontSize: 14, fontWeight: '500', marginBottom: 5, marginTop: 15,
  },
  input: {
    width: '100%', backgroundColor: '#f6f6f6', borderRadius: 8, height: 50, marginBottom: 10, fontSize: 16, paddingHorizontal: 15, borderWidth: 1, borderColor: '#e0e0e0',
  },
  descriptionInput: {
    height: 80, backgroundColor: '#f6f6f6', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', paddingHorizontal: 15, paddingTop: 15, fontSize: 16, marginBottom: 10,
  },
  selectorContainer: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
  },
  selectorButton: {
    backgroundColor: '#f6f6f6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 15, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0', minWidth: '30%', alignItems: 'center',
  },
  selectorButtonActive: { backgroundColor: '#D4EDDA', borderColor: '#138D35' },
  selectorButtonText: { fontSize: 14, color: '#333', fontWeight: '600' },
  selectorButtonTextActive: { color: '#138D35' },
  mainButton: {
    width: "100%", padding: 15, backgroundColor: "#138D35", borderRadius: 8, alignItems: "center", marginTop: 20, marginBottom: 15,
  },
  mainButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});

export default AddInfoPersonalScreen;