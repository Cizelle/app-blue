import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

// Define a new TypeScript interface for the received data
interface ReceivedDataItem {
  id: string;
  name: string;
  roleKey: string;
  time: string;
}

// Placeholder for user details and received data
const userDetails = {
  name: 'Ipshita', // Replace with dynamic data from state or context
  role: 'roles.citizen.title',
  phone: '9876543210',
  geolocation: '13.0827° N, 80.2707° E', // Replace with live geolocation data
  deviceId: 'ajk3098fjao23jfa', // Replace with a real device ID
  // FIX: Add signal strength
  signalStrength: 'Good', 
};

const receivedData: ReceivedDataItem[] = [
  { id: '1', name: 'Alex Johnson', roleKey: 'roles.citizen.title', time: '5 mins' },
  { id: '2', name: 'Jane Doe', roleKey: 'roles.official.title', time: '10 mins' },
  { id: '3', name: 'Community Member', roleKey: 'roles.citizen.title', time: '15 mins' },
];

const OfflineScreen = () => {
  const { t } = useTranslation();
  const [isOfflineModeEnabled, setOfflineModeEnabled] = useState(false);

  // Add a type annotation to the renderItem function
  const renderReceivedItem = ({ item }: { item: ReceivedDataItem }) => (
    <View style={styles.receivedItemCard}>
      <Icon name="account-circle-outline" size={24} color="#138D35" />
      <View style={styles.receivedItemContent}>
        <Text style={styles.receivedItemName}>{item.name}</Text>
        <Text style={styles.receivedItemRole}>{t(item.roleKey)}</Text>
      </View>
      <Text style={styles.receivedItemTime}>{t('offline.received.timeAgo', { time: item.time })}</Text>
    </View>
  );

  return (
    // FIX: Use SafeAreaView and the FlatList itself for scrolling
    <SafeAreaView style={styles.container}>
      {/* Connection Status Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{t('offline.status.title')}</Text>
        <View style={styles.connectionStatus}>
          <View style={[styles.statusDot, { backgroundColor: isOfflineModeEnabled ? '#f39c12' : '#2ecc71' }]} />
          <Text style={styles.statusText}>
            {isOfflineModeEnabled ? t('offline.status.offlineText') : t('offline.status.onlineText')} • {isOfflineModeEnabled ? t('offline.status.usingLocalData') : t('offline.status.servicesActive')}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{t('offline.status.offlineMode')}</Text>
          <Switch
            onValueChange={setOfflineModeEnabled}
            value={isOfflineModeEnabled}
            trackColor={{ false: '#767577', true: '#f39c12' }}
            thumbColor={isOfflineModeEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Section 1: Your Shared Details */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{t('offline.details.title')}</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t('offline.details.nameLabel')}</Text>
          <Text style={styles.detailValue}>{userDetails.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t('offline.details.roleLabel')}</Text>
          <Text style={styles.detailValue}>{t(userDetails.role)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t('offline.details.phoneLabel')}</Text>
          <Text style={styles.detailValue}>{userDetails.phone}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t('offline.details.geolocationLabel')}</Text>
          <Text style={styles.detailValue}>{userDetails.geolocation}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t('offline.details.deviceIdLabel')}</Text>
          <Text style={styles.detailValue}>{userDetails.deviceId}</Text>
        </View>
        {/* NEW: Signal Strength */}
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t('offline.details.signalStrength')}</Text>
          <View style={styles.signalContainer}>
            <Icon name="signal" size={16} color="#333" />
            <Text style={styles.detailValue}>{userDetails.signalStrength}</Text>
          </View>
        </View>
      </View>

      {/* Section 2: Received Data */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{t('offline.received.title')}</Text>
        <FlatList
          data={receivedData}
          renderItem={renderReceivedItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>{t('offline.received.emptyText')}</Text>
          )}
          // Removed scrollEnabled={false} and the wrapping <ScrollView>
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
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
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receivedItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  receivedItemContent: {
    flex: 1,
    marginLeft: 15,
  },
  receivedItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  receivedItemRole: {
    fontSize: 12,
    color: '#666',
  },
  receivedItemTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default OfflineScreen;

