import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

// 1. Define a TypeScript interface for the data structure
interface ResourcePackage {
  id: string;
  title: string;
  description: string;
  icon: string;
  fileUrl: string;
}

const ResourcesScreen = () => {
  const { t } = useTranslation();

  // The data is now defined inside the component to use the t function
  const resourcePackages: ResourcePackage[] = [
    {
      id: '1',
      title: t('resources.packages.survivalGuide.title'),
      description: t('resources.packages.survivalGuide.description'),
      icon: 'file-document-outline',
      fileUrl: 'https://www.example.com/guide.pdf', // Replace with your actual file URL
    },
    {
      id: '2',
      title: t('resources.packages.firstAid.title'),
      description: t('resources.packages.firstAid.description'),
      icon: 'clipboard-list-outline',
      fileUrl: 'https://www.example.com/checklist.pdf', // Replace with your actual file URL
    },
    {
      id: '3',
      title: t('resources.packages.shelterInfo.title'),
      description: t('resources.packages.shelterInfo.description'),
      icon: 'map-marker-radius-outline',
      fileUrl: 'https://www.example.com/shelter_info.pdf', // Replace with your actual file URL
    },
  ];

  const handleDownload = (fileUrl: string) => {
    Alert.alert(t('resources.alert.downloadTitle'), t('resources.alert.downloadMessage', { fileUrl }));
    console.log(`Simulating download for: ${fileUrl}`);
  };

  // 2. Add the type annotation to the renderItem function
  //    This tells TypeScript that 'item' is of type 'ResourcePackage'
  const renderItem = ({ item }: { item: ResourcePackage }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name={item.icon} size={30} color="#138D35" />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      
      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={() => handleDownload(item.fileUrl)}
      >
        <Icon name="download" size={20} color="#333" />
        <Text style={styles.downloadButtonText}>{t('resources.downloadButtonText')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('resources.headerTitle')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('resources.headerSubtitle')}
        </Text>
      </View>
      <FlatList
        data={resourcePackages}
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
    marginBottom: 15,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEB3B', // Yellow color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  downloadButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ResourcesScreen;