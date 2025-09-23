import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { DrawerScreenProps } from '@react-navigation/drawer';

// Define the type for the root stack param list
type RootStackParamList = {
  AnalystDashboard: undefined;
  // Add other routes you might navigate to from here
  HistoricalData: undefined;
  PolicyReports: undefined;
  ApiStatus: undefined;
};

// Define props type for this screen
type Props = DrawerScreenProps<RootStackParamList, 'AnalystDashboard'>;

// --- Placeholder Data ---
const kpiData = [
  { id: '1', titleKey: 'analystDashboard.kpi.totalMentions', value: '2,456', icon: 'message-text-outline', color: '#3498db' },
  { id: '2', titleKey: 'analystDashboard.kpi.growth', value: '+23%', icon: 'chart-line', color: '#2ecc71' },
  { id: '3', titleKey: 'analystDashboard.kpi.criticalAlerts', value: 47, icon: 'alert-circle-outline', color: '#e74c3c' },
  { id: '4', titleKey: 'analystDashboard.kpi.totalReach', value: '8.2M', icon: 'bullhorn-outline', color: '#f39c12' },
];

const trendingKeywords = [
  { id: '1', keyword: 'Tsunami', count: 234, color: '#e74c3c' },
  { id: '2', keyword: 'Evacuation', count: 189, color: '#3498db' },
  { id: '3', keyword: 'Rescue', count: 156, color: '#2ecc71' },
  { id: '4', keyword: 'Flooding', count: 143, color: '#f39c12' },
];

const highImpactPosts = [
  { id: '1', source: 'Twitter', time: '2 hours ago', content: 'Huge waves hitting Chennai marina! Everyone please stay away and find shelter! #Tsunami #Chennai', sentiment: 'negative' },
  { id: '2', source: 'Facebook', time: '5 hours ago', content: 'Relief teams are in the area providing aid. Follow official evacuation routes. #ReliefEffort #Evacuation', sentiment: 'positive' },
];

const apiStatusData = [
  { id: '1', name: 'Satellite Data Feed', status: 'Online', icon: 'satellite-variant', color: '#2ecc71' },
  { id: '2', name: 'Sensor Network', status: 'Partially Offline', icon: 'signal-cellular-off', color: '#f39c12' },
  { id: '3', name: 'GIS API', status: 'Online', icon: 'map-check-outline', color: '#2ecc71' },
];

const AnalystDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const renderKpiCard = ({ item }: { item: typeof kpiData[0] }) => (
    <View style={styles.kpiCard}>
      <Icon name={item.icon} size={30} color={item.color} style={styles.kpiIcon} />
      <Text style={styles.kpiValue}>{item.value}</Text>
      <Text style={styles.kpiTitle}>{t(item.titleKey)}</Text>
    </View>
  );

  const renderTrendingKeyword = ({ item }: { item: typeof trendingKeywords[0] }) => (
    <View style={styles.trendingKeywordItem}>
      <View style={[styles.keywordBullet, { backgroundColor: item.color }]} />
      <Text style={styles.keywordText}>{item.keyword}</Text>
      <Text style={styles.keywordCount}>{item.count}</Text>
    </View>
  );

  const renderHighImpactPost = ({ item }: { item: typeof highImpactPosts[0] }) => (
    <View style={styles.highImpactPostCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postSource}>{item.source}</Text>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
      <Text style={styles.postContent} numberOfLines={3}>{item.content}</Text>
      {/* Add a sentiment indicator if needed */}
    </View>
  );

  const renderApiStatusCard = ({ item }: { item: typeof apiStatusData[0] }) => (
    <View style={styles.apiStatusCard}>
      <Icon name={item.icon} size={24} color={item.color} style={{ marginRight: 10 }} />
      <Text style={styles.apiStatusName}>{item.name}</Text>
      <Text style={[styles.apiStatusText, { color: item.color }]}>{item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Icon name="waves" size={30} color="#138D35" style={styles.logoIcon} />
        <Text style={styles.headerTitle}>{t('analystDashboard.header.title')}</Text>
        <View style={styles.demoNavPlaceholder} />
      </View>

      <ScrollView style={styles.container}>
        {/* Analyst Dashboard Overview */}
        <View style={styles.dashboardOverview}>
          <Text style={styles.overviewMainTitle}>{t('analystDashboard.overview.mainTitle')}</Text>
          <Text style={styles.overviewSubtitle}>{t('analystDashboard.overview.subtitle')}</Text>
          <View style={styles.overviewTabs}>
            <TouchableOpacity style={styles.overviewTabButton} onPress={() => {/* Handle Active Response */ }}>
              <Icon name="graph" size={16} color="#3498db" />
              <Text style={styles.overviewTabButtonText}>{t('analystDashboard.overview.realtime')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overviewTabButton} onPress={() => {/* Handle Pending */ }}>
              <Text style={styles.overviewTabButtonText}>{t('analystDashboard.overview.posts')}</Text>
              <Text style={styles.overviewPendingCount}>1,247</Text>
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

        {/* Sentiment Trend Chart */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('analystDashboard.sentiment.title')}</Text>
          <View style={styles.chartPlaceholder}>
            <Icon name="chart-line-variant" size={50} color="#ccc" />
            <Text style={styles.chartPlaceholderText}>{t('analystDashboard.sentiment.chartPlaceholder')}</Text>
          </View>
        </View>

        {/* Trending Keywords */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('analystDashboard.keywords.title')}</Text>
          <FlatList
            data={trendingKeywords}
            renderItem={renderTrendingKeyword}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* High-Impact Posts */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('analystDashboard.highImpact.title')}</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>{t('analystDashboard.highImpact.viewAll')}</Text>
          </TouchableOpacity>
          <FlatList
            data={highImpactPosts}
            renderItem={renderHighImpactPost}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* System & API Status */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('analystDashboard.systemStatus.title')}</Text>
          <FlatList
            data={apiStatusData}
            renderItem={renderApiStatusCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Analytics & Reports Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('analystDashboard.analytics.title')}</Text>
          <Text style={styles.sectionDescription}>{t('analystDashboard.analytics.description')}</Text>
          <TouchableOpacity style={styles.analyticsButton}>
            <Icon name="database-arrow-down-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.analyticsButtonText}>{t('analystDashboard.analytics.exportData')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.analyticsButton} onPress={() => navigation.navigate('HistoricalData')}>
            <Icon name="chart-bar" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.analyticsButtonText}>{t('analystDashboard.analytics.viewHistorical')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.analyticsButton} onPress={() => navigation.navigate('PolicyReports')}>
            <Icon name="file-chart-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.analyticsButtonText}>{t('analystDashboard.analytics.generateReport')}</Text>
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
    flex: 1,
  },
  demoNavPlaceholder: {
    width: 100,
    height: 30,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  dashboardOverview: {
    backgroundColor: '#f39c12', // Analyst dashboard theme color
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  overviewMainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  overviewSubtitle: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 15,
  },
  overviewTabs: {
    flexDirection: 'row',
    marginTop: 10,
  },
  overviewTabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  overviewTabButtonText: {
    color: '#34495e',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  overviewPendingCount: {
    backgroundColor: '#34495e',
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
    width: '48%',
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
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: '#999',
    marginTop: 5,
  },
  trendingKeywordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  keywordBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  keywordText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  keywordCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  highImpactPostCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  postSource: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
  postContent: {
    fontSize: 14,
    color: '#555',
  },
  viewAllButton: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    marginBottom: 10,
  },
  viewAllButtonText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  apiStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  apiStatusName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  apiStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  analyticsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495e',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10,
  },
  analyticsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AnalystDashboardScreen;