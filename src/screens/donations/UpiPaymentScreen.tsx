import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

// Define the type for the route parameters
type UpiPaymentRouteProp = RouteProp<{ UpiPayment: { amount: number; upiId: string } }, 'UpiPayment'>;

const UpiPaymentScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<UpiPaymentRouteProp>();
  const { amount, upiId } = route.params;

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  useEffect(() => {
    // This effect runs the countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // This effect simulates the successful payment at exactly 4:21 (261 seconds)
    const successTimer = setTimeout(() => {
      setIsPaymentSuccessful(true);
      // Optionally, you can clear the countdown timer here as well
      clearInterval(timer); 
    }, (5 * 60 - 4 * 60 - 21) * 1000); // Convert 4:21 to seconds from 5:00

    // Cleanup function
    return () => {
      clearInterval(timer);
      clearTimeout(successTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleDone = () => {
    // Navigate back to the Dashboard or a confirmation screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('upiPayment.headerTitle')}</Text>
      </View>

      <View style={styles.content}>
        {isPaymentSuccessful ? (
          <View style={styles.statusContainer}>
            <Icon name="check-circle-outline" size={80} color="#138D35" />
            <Text style={styles.statusText}>{t('upiPayment.successTitle')}</Text>
            <Text style={styles.statusSubtitle}>{t('upiPayment.successMessage', { amount: amount.toFixed(2) })}</Text>
            <TouchableOpacity style={styles.mainButton} onPress={handleDone}>
              <Text style={styles.mainButtonText}>{t('upiPayment.doneButton')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.statusContainer}>
            <Icon name="timer-sand-empty" size={80} color="#FF9800" />
            <Text style={styles.statusText}>{t('upiPayment.timerTitle')}</Text>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.instructionsText}>{t('upiPayment.instructions')}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>{t('upiPayment.amountLabel')}: {amount.toFixed(2)}</Text>
              <Text style={styles.detailsText}>UPI ID: {upiId}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  statusSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  instructionsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  mainButton: {
    width: 200,
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UpiPaymentScreen;