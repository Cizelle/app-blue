import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AppHeaderProps {
  title: string;
  subtitle: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#138D35', // Green background
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    marginBottom: 20, // Space below the header
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D4EDDA', // Lighter green text
  },
});

export default AppHeader;