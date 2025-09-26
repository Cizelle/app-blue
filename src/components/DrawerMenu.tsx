/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const DrawerMenu = (props: any) => {
  const { navigation, onLogout } = props;
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('drawer.header.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('drawer.header.subtitle')}</Text>
        </View>

        <DrawerItem
          label={t('drawer.menuItems.donations')}
          labelStyle={styles.drawerLabel}
          icon={({ size }) => (
            <Icon name="heart-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Dashboard', params: { screen: 'Donate' } })}
        />
        <DrawerItem
          label={t('drawer.menuItems.simulationDrills')}
          labelStyle={styles.drawerLabel}
          icon={({ size }) => (
            <Icon name="gamepad-variant-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => {
            console.log('Navigating to Simulation Drills');
          }}
        />
        <DrawerItem
          label={t('drawer.menuItems.resources')}
          labelStyle={styles.drawerLabel}
          icon={({ size }) => (
            <Icon name="book-open-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => {
              // Navigate to the 'Resources' screen
            navigation.navigate('Resources');
          }}
        />
        <DrawerItem
          label={t('drawer.menuItems.allReports')}
          labelStyle={styles.drawerLabel}
          icon={({ size }) => (
            <Icon name="file-document-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate('AllReports');
          }}
        />
        <DrawerItem
          label={t('drawer.menuItems.missingPersonFinder')}
          labelStyle={styles.drawerLabel}
          icon={({ size }) => (
            <Icon name="magnify" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => navigation.navigate('MainTabs', { screen: 'MissingPersonFinder' })}
        />
        <DrawerItem
          label={t('drawer.menuItems.settings')}
          labelStyle={styles.drawerLabel}
          icon={({ size }) => (
            <Icon name="cog-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Profile', params: { screen: 'Settings' } })}
        />
        <DrawerItem
          label={t('drawer.menuItems.logout')}
          labelStyle={[styles.drawerLabel, styles.logoutLabel]}
          icon={({ size }) => (
            <Icon name="logout" size={size} color="#D45348" />
          )}
          style={styles.drawerItem}
          onPress={() => {
            if (onLogout) {
                onLogout();
            }
        }}
        />
      </DrawerContentScrollView>

      <View style={styles.bottomStatus}>
        <View style={styles.onlineIndicator} />
        <Text style={styles.statusText}>{t('drawer.status.onlineText')}</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  drawerItem: {
    marginVertical: 5,
  },
  drawerLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutLabel: {
    color: '#D45348',
  },
  bottomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#138D35',
    marginRight: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DrawerMenu;