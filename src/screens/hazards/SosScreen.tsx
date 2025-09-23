import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const DUMMY_ALERTS = [
  { id: 1, type: 'sos.alertTypes.sos', location: 'Marina Beach', name: 'John Doe', time: '5' },
  { id: 2, type: 'sos.alertTypes.floodAlert', location: 'Kollam Main Road', name: 'Emergency Services', time: '12' },
  { id: 3, type: 'sos.alertTypes.highWave', location: 'Near Coastal Highway', name: 'Jane Smith', time: '30' },
];

const SosScreen = () => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<any>();

  const handleSOSPress = () => {
    setIsSending(true);
    Alert.alert(
      t('sos.alert.sentTitle'),
      t('sos.alert.sentMessage'),
      [{ text: t('sos.alert.okButton'), onPress: () => setIsSending(false) }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('sos.headerTitle')}</Text>
      </View>

      <TouchableOpacity
        style={styles.sosButton}
        onPress={handleSOSPress}
        disabled={isSending}
      >
        <Icon name="alert-octagon" size={80} color="#fff" />
        <Text style={styles.sosButtonText}>
          {isSending ? t('sos.buttonSending') : t('sos.buttonText')}
        </Text>
      </TouchableOpacity>

      <View style={styles.receivedContainer}>
        <View style={styles.receivedHeader}>
          <Icon name="bell-ring-outline" size={24} color="#138D35" />
          <Text style={styles.receivedTitle}>{t('sos.receivedAlertsTitle')}</Text>
        </View>
        
        <ScrollView style={styles.alertList}>
          {DUMMY_ALERTS.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              <View style={styles.alertIconContainer}>
                <Icon name="map-marker-radius" size={24} color="#D45348" />
              </View>
              <View style={styles.alertDetails}>
                <Text style={styles.alertType}>{t(alert.type)}</Text>
                <Text style={styles.alertLocation}>{alert.location}</Text>
              </View>
              <View style={styles.alertMeta}>
                <Text style={styles.alertTime}>{t('sos.alertTimeAgo', { time: alert.time })}</Text>
                <Text style={styles.alertSender}>{t('sos.alertSenderPrefix')} {alert.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
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
  sosButton: {
    backgroundColor: '#D45348',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  receivedContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  receivedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  receivedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  alertList: {
    flex: 1,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
  },
  alertIconContainer: {
    backgroundColor: '#FFF0F0',
    borderRadius: 20,
    padding: 8,
    marginRight: 15,
  },
  alertDetails: {
    flex: 1,
  },
  alertType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  alertLocation: {
    fontSize: 14,
    color: '#666',
  },
  alertMeta: {
    alignItems: 'flex-end',
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
  },
  alertSender: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default SosScreen;