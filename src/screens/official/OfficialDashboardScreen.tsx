import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Import if you need navigation props
import { DrawerScreenProps } from '@react-navigation/drawer';

// Define the type for the root stack param list
// Assuming RootStackParamList exists in your App.tsx or a types file
type RootStackParamList = {
  OfficialDashboard: undefined;
  // Add other routes you might navigate to from here, e.g.,
  ReportDetails: { reportId: string };
  ResourceManagement: undefined;
  MissingPersonFinder: undefined;
  ViewMap: undefined;
};

// Define props type for this screen
type Props = DrawerScreenProps<RootStackParamList, 'OfficialDashboard'>;

// --- Placeholder Data ---
// In a real app, this data would come from your API or a global state manager
const kpiData = [
  { id: '1', titleKey: 'officialDashboard.kpi.pendingReports', value: 15, icon: 'file-clock-outline', color: '#ff7f50' },
  { id: '2', titleKey: 'officialDashboard.kpi.validatedToday', value: 142, icon: 'check-circle-outline', color: '#2ecc71' },
  { id: '3', titleKey: 'officialDashboard.kpi.activeHotspots', value: 7, icon: 'map-marker-radius', color: '#3498db' },
  { id: '4', titleKey: 'officialDashboard.kpi.citizensHelped', value: 1247, icon: 'account-group-outline', color: '#f1c40f' },
  { id: '5', titleKey: 'officialDashboard.kpi.resourcesDeployed', value: 8, icon: 'truck-outline', color: '#e74c3c' },
  { id: '6', titleKey: 'officialDashboard.kpi.alertsBroadcast', value: 23, icon: 'bullhorn-outline', color: '#9b59b6' },
  { id: '7', titleKey: 'officialDashboard.kpi.fundsAllocated', value: '₹5M', icon: 'currency-inr', color: '#1abc9c' },
];

const validationQueueData = [
  { id: '1', type: 'Tsunami Warning', severity: 'high', location: 'Mahabalipuram', time: '15 mins', description: 'Large waves approaching shore, estimated 3-4 meters', verified: false },
  { id: '2', type: 'Storm Surge', severity: 'moderate', location: 'Pondicherry', time: '32 mins', description: 'Water level rising rapidly in coastal areas', verified: false },
  { id: '3', type: 'Earthquake Damage', severity: 'low', location: 'Chennai', time: '1 hr', description: 'Minor structural damage reported in old buildings', verified: true },
];

const activeHotspotsData = [
  { id: '1', name: 'Chennai Marina', reports: 12, status: 'Critical' },
  { id: '2', name: 'Puducherry Beach', reports: 8, status: 'High' },
  { id: '3', name: 'Kanchipuram District', reports: 3, status: 'Medium' },
];

const earlyWarningAlerts = [
  { id: '1', title: 'Cyclone Alert issued for Coastal Tamil Nadu', type: 'Weather', time: 'Just now' },
  { id: '2', title: 'High Tide warning for Bay of Bengal', type: 'Oceanographic', time: '3 hours ago' },
];

const OfficialDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'active' for validation queue

  const renderKpiCard = ({ item }: { item: typeof kpiData[0] }) => (
    <View style={styles.kpiCard}>
      <Icon name={item.icon} size={30} color={item.color} style={styles.kpiIcon} />
      <Text style={styles.kpiValue}>{item.value}</Text>
      <Text style={styles.kpiTitle}>{t(item.titleKey)}</Text>
    </View>
  );

  const renderReportCard = ({ item }: { item: typeof validationQueueData[0] }) => (
    <TouchableOpacity
      style={styles.reportCard}
      onPress={() => navigation.navigate('ReportDetails', { reportId: item.id })} // Example navigation
    >
      <Icon name="alert-outline" size={24} color={item.verified ? '#2ecc71' : '#ff7f50'} style={styles.reportIcon} />
      <View style={styles.reportContent}>
        <View style={styles.reportHeader}>
          <Text style={styles.reportType}>{item.type}</Text>
          <Text style={[styles.reportSeverity, { backgroundColor: item.severity === 'high' ? '#e74c3c' : item.severity === 'moderate' ? '#f39c12' : '#2ecc71' }]}>
            {item.severity}
          </Text>
        </View>
        <Text style={styles.reportMeta}>{item.location} • {item.time} ago</Text>
        <Text style={styles.reportDescription}>{item.description}</Text>
        {!item.verified && (
          <View style={styles.reportActions}>
            <TouchableOpacity style={[styles.actionButton, styles.validateButton]}>
              <Text style={styles.actionButtonText}>{t('officialDashboard.validation.validate')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
              <Text style={styles.actionButtonText}>{t('officialDashboard.validation.reject')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderHotspotCard = ({ item }: { item: typeof activeHotspotsData[0] }) => (
    <View style={styles.hotspotCard}>
      <View style={styles.hotspotInfo}>
        <Text style={styles.hotspotName}>{item.name}</Text>
        <Text style={styles.hotspotReports}>{item.reports} {t('officialDashboard.hotspots.reports')}</Text>
      </View>
      <Text style={[styles.hotspotStatus, { backgroundColor: item.status === 'Critical' ? '#e74c3c' : item.status === 'High' ? '#f39c12' : '#2ecc71' }]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Icon name="waves" size={30} color="#138D35" style={styles.logoIcon} />
        <Text style={styles.headerTitle}>{t('officialDashboard.header.title')}</Text>
        {/* Placeholder for demo navigation/role switch as in image */}
        <View style={styles.demoNavPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        {/* Dashboard Overview */}
        <View style={styles.dashboardOverview}>
          <Text style={styles.overviewMainTitle}>{t('officialDashboard.overview.mainTitle')}</Text>
          <Text style={styles.overviewSubtitle}>{t('officialDashboard.overview.subtitle')}</Text>
          <View style={styles.overviewTabs}>
            <TouchableOpacity style={styles.overviewTabButton} onPress={() => {/* Handle Active Response */ }}>
              <Icon name="flash" size={16} color="#3498db" />
              <Text style={styles.overviewTabButtonText}>{t('officialDashboard.overview.activeResponse')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overviewTabButton} onPress={() => {/* Handle Pending */ }}>
              <Text style={styles.overviewTabButtonText}>{t('officialDashboard.overview.pending')}</Text>
              <Text style={styles.overviewPendingCount}>15</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* KPI Cards */}
        <FlatList
          data={kpiData}
          renderItem={renderKpiCard}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.kpiGrid}
          scrollEnabled={false}
        />

        {/* Validation Queue */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.validation.queueTitle')}</Text>
          <View style={styles.queueFilter}>
            <TouchableOpacity
              style={[styles.filterButton, activeTab === 'pending' && styles.filterButtonActive]}
              onPress={() => setActiveTab('pending')}
            >
              <Text style={[styles.filterButtonText, activeTab === 'pending' && styles.filterButtonTextActive]}>
                {t('officialDashboard.validation.pending')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, activeTab === 'active' && styles.filterButtonActive]}
              onPress={() => setActiveTab('active')}
            >
              <Text style={[styles.filterButtonText, activeTab === 'active' && styles.filterButtonTextActive]}>
                {t('officialDashboard.validation.active')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>{t('officialDashboard.validation.filter')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={validationQueueData.filter(item => activeTab === 'pending' ? !item.verified : item.verified)}
            renderItem={renderReportCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ListEmptyComponent={() => <Text style={styles.emptyListText}>{t('officialDashboard.validation.noReports')}</Text>}
          />
        </View>

        {/* Real-time Hotspot Analysis */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.hotspots.title')}</Text>
          <View style={styles.hotspotMapPlaceholder}>
            <Icon name="map-marker-outline" size={50} color="#ccc" />
            <Text style={styles.hotspotMapText}>{t('officialDashboard.hotspots.mapPlaceholder')}</Text>
            <TouchableOpacity style={styles.viewMapButton} onPress={() => navigation.navigate('ViewMap')}>
              <Text style={styles.viewMapButtonText}>{t('officialDashboard.hotspots.viewMap')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={activeHotspotsData}
            renderItem={renderHotspotCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.viewAllHotspotsButton}>
            <Text style={styles.viewAllHotspotsButtonText}>{t('officialDashboard.hotspots.viewAll')}</Text>
          </TouchableOpacity>
        </View>

        {/* Resource Allocation Dashboard */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.resource.title')}</Text>
          <Text style={styles.sectionDescription}>{t('officialDashboard.resource.description')}</Text>
          <View style={styles.resourceSummary}>
            <Text style={styles.resourceSummaryText}>• {t('officialDashboard.resource.medicalTeams')}: 5 {t('officialDashboard.resource.deployed')}</Text>
            <Text style={styles.resourceSummaryText}>• {t('officialDashboard.resource.rescueUnits')}: 3 {t('officialDashboard.resource.deployed')}</Text>
            <Text style={styles.resourceSummaryText}>• {t('officialDashboard.resource.foodSupplies')}: 10 {t('officialDashboard.resource.tons')}</Text>
          </View>
          <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate('ResourceManagement')}>
            <Text style={styles.manageButtonText}>{t('officialDashboard.resource.manageResources')}</Text>
          </TouchableOpacity>
        </View>

        {/* Cross-Agency Communication Panel */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.communication.title')}</Text>
          <Text style={styles.sectionDescription}>{t('officialDashboard.communication.description')}</Text>
          <TouchableOpacity style={styles.communicationButton}>
            <Icon name="chat-processing-outline" size={20} color="#fff" style={styles.communicationIcon} />
            <Text style={styles.communicationButtonText}>{t('officialDashboard.communication.openChat')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communicationButton}>
            <Icon name="email-outline" size={20} color="#fff" style={styles.communicationIcon} />
            <Text style={styles.communicationButtonText}>{t('officialDashboard.communication.sendEmail')}</Text>
          </TouchableOpacity>
        </View>

        {/* Predictive Models & Early Warning Integration */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.earlyWarning.title')}</Text>
          {earlyWarningAlerts.map(alert => (
            <View key={alert.id} style={styles.earlyWarningCard}>
              <Icon name="alert-decagram-outline" size={20} color="#e74c3c" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.earlyWarningTitle}>{alert.title}</Text>
                <Text style={styles.earlyWarningMeta}>{alert.type} • {alert.time}</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#999" />
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>{t('officialDashboard.earlyWarning.viewAll')}</Text>
          </TouchableOpacity>
        </View>

        {/* Offline Communication Network Status */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.offlineStatus.title')}</Text>
          <View style={styles.offlineStatusIndicator}>
            <Icon name="signal-off" size={24} color="#f39c12" />
            <Text style={styles.offlineStatusText}>{t('officialDashboard.offlineStatus.status')}</Text>
          </View>
          <Text style={styles.sectionDescription}>{t('officialDashboard.offlineStatus.lastSync')}: {new Date().toLocaleString()}</Text>
        </View>

        {/* Donor Information and Fund Allocation Tracking */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.donorFunds.title')}</Text>
          <Text style={styles.sectionDescription}>{t('officialDashboard.donorFunds.overview')}</Text>
          <View style={styles.fundDetail}>
            <Text style={styles.fundDetailLabel}>{t('officialDashboard.donorFunds.totalDonations')}:</Text>
            <Text style={styles.fundDetailValue}>₹12,500,000</Text>
          </View>
          <View style={styles.fundDetail}>
            <Text style={styles.fundDetailLabel}>{t('officialDashboard.donorFunds.allocated')}:</Text>
            <Text style={styles.fundDetailValue}>₹7,800,000</Text>
          </View>
          <TouchableOpacity style={styles.manageButton}>
            <Text style={styles.manageButtonText}>{t('officialDashboard.donorFunds.manageFunds')}</Text>
          </TouchableOpacity>
        </View>

        {/* Missing Person Database Quick Search */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.missingPersons.title')}</Text>
          <Text style={styles.sectionDescription}>{t('officialDashboard.missingPersons.description')}</Text>
          <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('MissingPersonFinder')}>
            <Icon name="account-search-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.searchButtonText}>{t('officialDashboard.missingPersons.search')}</Text>
          </TouchableOpacity>
        </View>

        {/* Generate Situation Reports */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('officialDashboard.reports.generate')}</Text>
          <Text style={styles.sectionDescription}>{t('officialDashboard.reports.description')}</Text>
          <TouchableOpacity style={styles.generateReportButton}>
            <Icon name="file-chart-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.generateReportButtonText}>{t('officialDashboard.reports.generateReport')}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 5,
  },
  logoIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Allows title to take available space
  },
  demoNavPlaceholder: {
    width: 100, // Placeholder for where the demo nav dropdown would be
    height: 30,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  dashboardOverview: {
    backgroundColor: '#34495e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  overviewMainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  overviewSubtitle: {
    fontSize: 14,
    color: '#ecf0f1',
    marginBottom: 15,
  },
  overviewTabs: {
    flexDirection: 'row',
    marginTop: 10,
  },
  overviewTabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  overviewTabButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  overviewPendingCount: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    fontSize: 12,
    marginLeft: 5,
  },
  kpiGrid: {
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  kpiCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Approx half of the width minus margin
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kpiIcon: {
    marginBottom: 5,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  kpiTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  queueFilter: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#138D35',
  },
  filterButtonText: {
    color: '#555',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reportIcon: {
    marginRight: 10,
    marginTop: 2, // Align with text
  },
  reportContent: {
    flex: 1,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reportType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  reportSeverity: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  reportMeta: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  reportDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  reportActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  validateButton: {
    backgroundColor: '#138D35',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
  },
  hotspotMapPlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotspotMapText: {
    color: '#999',
    marginTop: 5,
  },
  viewMapButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  viewMapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hotspotCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  hotspotInfo: {
    flex: 1,
  },
  hotspotName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  hotspotReports: {
    fontSize: 12,
    color: '#777',
  },
  hotspotStatus: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  viewAllHotspotsButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  viewAllHotspotsButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  resourceSummary: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  resourceSummaryText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  manageButton: {
    backgroundColor: '#138D35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  manageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  communicationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 10,
  },
  communicationIcon: {
    marginRight: 10,
  },
  communicationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  earlyWarningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  earlyWarningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  earlyWarningMeta: {
    fontSize: 12,
    color: '#777',
  },
  viewAllButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  viewAllButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  offlineStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  offlineStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f39c12',
    marginLeft: 10,
  },
  fundDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 5,
  },
  fundDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  fundDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9b59b6', // A purple tone
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  generateReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495e', // Darker tone for reports
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10,
  },
  generateReportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OfficialDashboardScreen;