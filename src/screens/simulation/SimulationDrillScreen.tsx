import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

// Define a TypeScript interface for the data structure
interface SimulationGame {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const SimulationDrillScreen = () => {
  const { t } = useTranslation();

  // The data is now defined inside the component to use the t function
  const simulationGames: SimulationGame[] = [
    {
      id: '1',
      title: t('simulation.drills.highTideHero.title'),
      description: t('simulation.drills.highTideHero.description'),
      icon: 'water-alert',
      color: '#3498db',
    },
    {
      id: '2',
      title: t('simulation.drills.coastalCommander.title'),
      description: t('simulation.drills.coastalCommander.description'),
      icon: 'city',
      color: '#2ecc71',
    },
    {
      id: '3',
      title: t('simulation.drills.tsunamiTriviaRush.title'),
      description: t('simulation.drills.tsunamiTriviaRush.description'),
      icon: 'book-open-variant',
      color: '#e74c3c',
    },
  ];

  const renderItem = ({ item }: { item: SimulationGame }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name={item.icon} size={30} color={item.color} />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.playButton}>
        <Text style={styles.playButtonText}>{t('simulation.playButtonText')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('simulation.headerTitle')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('simulation.headerSubtitle')}
        </Text>
      </View>
      <FlatList
        data={simulationGames}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  playButton: {
    marginTop: 15,
    backgroundColor: '#138D35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SimulationDrillScreen;