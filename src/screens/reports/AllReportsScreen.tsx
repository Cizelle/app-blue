import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

// 1. Define the type for a Report
interface Report {
  id: string;
  title: string;
  date: string;
  status: string;
}

// Dummy data with the correct type, now focused on Indian marina hazards
const DUMMY_REPORTS: Report[] = [
  { id: '1', title: 'Oil Spill Alert - Mumbai Harbour', date: '2025-09-22', status: 'Active' },
  { id: '2', title: 'Cyclone Warning - Bay of Bengal', date: '2025-09-21', status: 'Completed' },
  { id: '3', title: 'Jellyfish Swarm - Goa Beaches', date: '2025-09-20', status: 'Pending Review' },
  { id: '4', title: 'Ship Collision - Chennai Port', date: '2025-09-19', status: 'Archived' },
  { id: '5', title: 'Fisherfolk Rescue - Kerala Coast', date: '2025-09-18', status: 'Completed' },
  { id: '6', title: 'Algal Bloom - Visakhapatnam Coast', date: '2025-09-17', status: 'Completed' },
  { id: '7', title: 'Mangrove Damage Report - Sunderbans', date: '2025-09-16', status: 'Completed' },
  { id: '8', title: 'Port Congestion Warning - Kandla', date: '2025-09-15', status: 'Active' },
  { id: '9', title: 'Coral Reef Bleaching - Lakshadweep', date: '2025-09-14', status: 'Archived' },
  { id: '10', title: 'Rip Current Alert - Odisha Coast', date: '2025-09-13', status: 'Pending Review' },
];

const AllReportsScreen = () => {
  // 2. Type the renderItem function to use the Report interface
  const renderReportItem = ({ item }: { item: Report }) => (
    <View style={styles.reportItem}>
      <Text style={styles.reportTitle}>{item.title}</Text>
      <Text style={styles.reportDate}>Date: {item.date}</Text>
      <Text style={styles.reportStatus}>Status: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>All Reports</Text>
      <FlatList
        data={DUMMY_REPORTS}
        renderItem={renderReportItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  reportStatus: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
});

export default AllReportsScreen;