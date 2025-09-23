// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Alert
} from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

// Define the types for navigation based on your project structure
// Assuming a Drawer Navigator is used for the main app screens
type RootDrawerParamList = {
  FamilyTracker: undefined;
  // Add other routes here if you need to navigate to them
};

type Props = DrawerScreenProps<RootDrawerParamList, 'FamilyTracker'>;

// --- Placeholder Data ---
// In a real app, this data would come from your API
const familyMembersData = [
  { id: '1', name: 'Sarah Johnson', relation: 'Spouse', status: 'safe', lastLocation: 'Marina Beach Safe Zone', lastUpdated: '2 minutes ago', phone: '9876543210', email: 'sarah.j@example.com', deviceId: 'DEV-SJ-001' },
  { id: '2', name: 'Alex Johnson', relation: 'Child', status: 'safe', lastLocation: 'Anna University', lastUpdated: '15 minutes ago', phone: '9876543211', email: 'alex.j@example.com', deviceId: 'DEV-AJ-002' },
  { id: '3', name: 'Robert Johnson', relation: 'Father', status: 'at-risk', lastLocation: 'Near Mount Road', lastUpdated: '45 minutes ago', phone: '9876543212', email: 'robert.j@example.com', deviceId: 'DEV-RJ-003' },
  { id: '4', name: 'Maria Johnson', relation: 'Mother', status: 'missing', lastLocation: 'Unknown', lastUpdated: '3 hours ago', phone: '9876543213', email: 'maria.j@example.com', deviceId: 'DEV-MJ-004' },
];

const FamilyTrackerScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  // Calculate the status counts based on the data
  const statusCounts = familyMembersData.reduce((acc, member) => {
    if (member.status === 'safe') acc.safe++;
    else if (member.status === 'at-risk') acc.atRisk++;
    else if (member.status === 'missing') acc.missing++;
    return acc;
  }, { safe: 0, atRisk: 0, missing: 0 });

  const handleAddMember = () => {
    // Logic to open a modal or navigate to a screen to add a new family member
    Alert.alert(t('familyTracker.addMemberTitle'), t('familyTracker.addMemberMessage'));
  };

  const handleSendAlert = () => {
    Alert.alert(t('familyTracker.sendAlertTitle'), t('familyTracker.sendAlertMessage'));
  };

  const handleLeaveFamily = () => {
    Alert.alert(t('familyTracker.leaveFamilyTitle'), t('familyTracker.leaveFamilyMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.confirm'), onPress: () => console.log('Left family') },
    ]);
  };

  const renderMemberCard = ({ item }: { item: typeof familyMembersData[0] }) => {
    const statusColor = item.status === 'safe' ? '#2ecc71' : item.status === 'at-risk' ? '#f39c12' : '#e74c3c';
    const statusTextKey = `familyTracker.status.${item.status}`;
    const initials = item.name.split(' ').map(n => n[0]).join('');

    return (
      <View style={styles.memberCard}>
        <View style={[styles.initialsContainer, { backgroundColor: statusColor }]}>
          <Text style={styles.initialsText}>{initials}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.nameRow}>
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              {t(statusTextKey)}
            </Text>
          </View>
          <Text style={styles.memberDetails}>{item.relation} • {item.lastUpdated}</Text>
          <Text style={styles.memberDetails}>{item.lastLocation}</Text>
          <Text style={styles.memberDetails}>Phone: {item.phone}</Text>
          <Text style={styles.memberDetails}>Email: {item.email}</Text>
          <Text style={styles.memberDetails}>Device ID: {item.deviceId}</Text>
        </View>
        <TouchableOpacity onPress={() => Alert.alert(t('familyTracker.call'), `Calling ${item.name}`)}>
          <Icon name="phone-circle" size={30} color={statusColor} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* App Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Icon name="waves" size={30} color="#138D35" style={styles.logoIcon} />
        <Text style={styles.headerTitle}>{t('familyTracker.header.title')}</Text>
        <View style={styles.demoNavPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        {/* Family Status Tracker */}
        <View style={styles.statusTrackerCard}>
          <Icon name="account-group-outline" size={30} color="#fff" />
          <View style={styles.statusInfo}>
            <Text style={styles.trackerTitle}>{t('familyTracker.trackerTitle')}</Text>
            <Text style={styles.trackerSubtitle}>{t('familyTracker.trackerSubtitle')}</Text>
          </View>
          <View style={styles.statusCountsContainer}>
            <View style={styles.statusCountItem}>
              <Text style={styles.statusCountText}>{statusCounts.safe}</Text>
              <Text style={styles.statusLabelText}>{t('familyTracker.status.safe')}</Text>
            </View>
            <View style={styles.statusCountItem}>
              <Text style={styles.statusCountText}>{statusCounts.atRisk}</Text>
              <Text style={styles.statusLabelText}>{t('familyTracker.status.atRisk')}</Text>
            </View>
            <View style={styles.statusCountItem}>
              <Text style={styles.statusCountText}>{statusCounts.missing}</Text>
              <Text style={styles.statusLabelText}>{t('familyTracker.status.missing')}</Text>
            </View>
          </View>
        </View>

        {/* Add Family Member Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
            <Icon name="account-plus-outline" size={20} color="#fff" style={styles.addButtonIcon} />
            <Text style={styles.addButtonText}>{t('familyTracker.addButton')}</Text>
          </TouchableOpacity>
        </View>

        {/* Family Members List (Horizontal) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('familyTracker.memberListTitle')}</Text>
          <FlatList
            horizontal
            data={familyMembersData}
            renderItem={renderMemberCard}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Placeholder for Map */}
        <View style={[styles.sectionContainer, styles.mapPlaceholder]}>
          <Icon name="map-marker-radius-outline" size={50} color="#ccc" />
          <Text style={styles.placeholderText}>{t('familyTracker.mapPlaceholder')}</Text>
        </View>

        {/* Emergency Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('familyTracker.emergencyActionsTitle')}</Text>
          <TouchableOpacity style={[styles.emergencyButton, styles.sendAlertButton]} onPress={handleSendAlert}>
            <Icon name="bell-alert-outline" size={20} color="#fff" style={styles.emergencyIcon} />
            <Text style={styles.emergencyButtonText}>{t('familyTracker.sendAlert')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.emergencyButton, styles.leaveFamilyButton]} onPress={handleLeaveFamily}>
            <Icon name="account-remove-outline" size={20} color="#fff" style={styles.emergencyIcon} />
            <Text style={styles.emergencyButtonText}>{t('familyTracker.leaveFamily')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f2f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'space-between',
  },
  menuButton: { padding: 5 },
  logoIcon: { marginLeft: 10, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', flex: 1 },
  demoNavPlaceholder: { width: 100, height: 30 },
  container: { flex: 1, padding: 15 },
  statusTrackerCard: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusInfo: { flex: 1, marginLeft: 15 },
  trackerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  trackerSubtitle: { fontSize: 14, color: '#ecf0f1' },
  statusCountsContainer: { flexDirection: 'row', },
  statusCountItem: { alignItems: 'center', marginHorizontal: 10 },
  statusCountText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  statusLabelText: { fontSize: 12, color: '#ecf0f1' },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 15,
  },
  addButtonIcon: { marginRight: 10 },
  addButtonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  horizontalList: { paddingRight: 20 },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 280, // Fixed width for horizontal card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  initialsText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  cardContent: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  memberName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 10 },
  statusBadge: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  memberDetails: { fontSize: 12, color: '#666', marginBottom: 2 },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { fontSize: 16, color: '#ccc', marginTop: 10 },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 15,
    marginBottom: 10,
  },
  sendAlertButton: { backgroundColor: '#e74c3c' },
  leaveFamilyButton: { backgroundColor: '#7f8c8d' },
  emergencyIcon: { marginRight: 10 },
  emergencyButtonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});

export default FamilyTrackerScreen;