/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const DonationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [purpose, setPurpose] = useState('');
  const [totalDonated, setTotalDonated] = useState(0);

  const paymentMethods = [t('donation.paymentMethods.upi'), t('donation.paymentMethods.gpay'), t('donation.paymentMethods.crypto')];

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0 || !paymentMethod) {
      Alert.alert(t('donation.alert.incompleteTitle'), t('donation.alert.incompleteMessage'));
      return;
    }
    Alert.alert(
      t('donation.alert.successTitle'),
      t('donation.alert.successMessage', { amount: donationAmount.toFixed(2), currency: t('donation.currencySymbol') })
    );
    setTotalDonated(prev => prev + donationAmount);
    setAmount('');
    setPaymentMethod('');
    setPurpose('');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('donation.headerTitle')}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.totalDonationCard}>
          <Text style={styles.totalDonationLabel}>{t('donation.totalDonatedLabel')}</Text>
          <Text style={styles.totalDonationAmount}>
            {t('donation.currencySymbol')}{totalDonated.toFixed(2)}
          </Text>
        </View>

        <Text style={styles.inputLabel}>{t('donation.amountLabel')} *</Text>
        <TextInput
          style={styles.input}
          placeholder={t('donation.amountPlaceholder')}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.inputLabel}>{t('donation.paymentMethodLabel')} *</Text>
        <View style={styles.selectorContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.selectorButton,
                paymentMethod === method && styles.selectorButtonActive,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  paymentMethod === method && styles.selectorButtonTextActive,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>{t('donation.purposeLabel')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('donation.purposePlaceholder')}
          value={purpose}
          onChangeText={setPurpose}
        />

        <TouchableOpacity style={styles.mainButton} onPress={handleDonate}>
          <Text style={styles.mainButtonText}>{t('donation.donateButton')}</Text>
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
  totalDonationCard: {
    backgroundColor: '#138D35',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  totalDonationLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  totalDonationAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 15,
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
  mainButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default DonationScreen;