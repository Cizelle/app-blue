/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ReportHazardScreen from '../screens/hazards/ReportHazardScreen';
import DonationScreen from '../screens/donations/DonationScreen';
import DrawerMenu from '../components/DrawerMenu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AddInfoPersonalScreen from '../screens/profile/AddInfoPersonalScreen';
import AddInfoMedicalScreen from '../screens/profile/AddInfoMedicalScreen';
import ProfileConfirmationScreen from '../screens/auth/ProfileConfirmationScreen';
import SosScreen from '../screens/hazards/SosScreen';
import FamilyTrackerScreen from '../screens/family/FamilyTrackerScreen';
import AllReportsScreen from '../screens/reports/AllReportsScreen';
import ResourcesScreen from '../screens/resources/ResourcesScreen';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import MissingPersonFinderScreen from '../screens/missingperson/MissingPersonFinderScreen';
import UpiPaymentScreen from '../screens/donations/UpiPaymentScreen';
import offlineScreen from '../screens/offline/OfflineScreen';


// The OfflineScreen component is already correctly defined here.
const OfflineScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={offlineStyles.container}>
      <Icon name="signal-off" size={60} color="#999" />
      <Text style={offlineStyles.title}>{t('offlineScreen.title')}</Text>
      <Text style={offlineStyles.subtitle}>{t('offlineScreen.subtitle')}</Text>
    </View>
  );
};

const offlineStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const FamilyTrackerStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Updated type for the nested navigation stacks
export type DashboardStackParamList = {
  DashboardHome: { username: string };
  ReportHazard: undefined;
  Donate: undefined;
  UpiPayment: { amount: number; upiId: string }; // <-- ADDED THIS LINE
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  AddPersonal: undefined;
  AddMedical: undefined;
  ProfileConfirmation: undefined;
};

export type FamilyTrackerParamList = {
  FamilyTrackerHome: undefined;
};

// Define the navigation stack for the Dashboard tab
const DashboardStackScreen = ({ route }: any) => {
  // Correctly access username from route.params
  const { username } = route.params; 
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen
        name="DashboardHome"
        component={DashboardScreen}
        initialParams={{ username }}
      />
      <DashboardStack.Screen 
        name="UpiPayment" 
        component={UpiPaymentScreen} 
        options={{ headerShown: false }} 
      />
      <DashboardStack.Screen name="ReportHazard" component={ReportHazardScreen} />
      <DashboardStack.Screen name="Donate" component={DonationScreen} />
    </DashboardStack.Navigator>
  );
};

// Define the navigation stack for the Profile tab
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} />
      <ProfileStack.Screen name="AddPersonal" component={AddInfoPersonalScreen} />
      <ProfileStack.Screen name="AddMedical" component={AddInfoMedicalScreen} />
      <ProfileStack.Screen name="ProfileConfirmation" component={ProfileConfirmationScreen} />
    </ProfileStack.Navigator>
  );
};

// Define the navigation stack for the Family Tracker tab
const FamilyTrackerStackScreen = () => {
  return (
    <FamilyTrackerStack.Navigator screenOptions={{ headerShown: false }}>
      <FamilyTrackerStack.Screen name="FamilyTrackerHome" component={FamilyTrackerScreen} />
    </FamilyTrackerStack.Navigator>
  );
};

// Main Tab Navigator
const MainTabs = ({ route }: any) => {
  // Correctly access user and onLogout from route.params
  const { user, onLogout } = route.params;
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              break;
            case 'Family':
              iconName = focused ? 'account-group' : 'account-group-outline';
              break;
            case 'SOS':
              iconName = 'alert-octagon';
              break;
            case 'Offline':
              iconName = focused ? 'signal-off' : 'signal-off';
              break;
            case 'Profile':
              iconName = focused ? 'account-circle' : 'account-circle-outline';
              break;
            case 'MissingPersonFinder':
              iconName = focused ? 'magnify' : 'magnify';
              break;
            default:
              iconName = 'help-circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#138D35',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        // Fix: Pass the username directly to the Dashboard stack
        initialParams={{ username: user?.name }}
        options={{ tabBarLabel: t('navigation.dashboard') }}
      />
      <Tab.Screen
        name="Family"
        component={FamilyTrackerStackScreen}
        options={{ tabBarLabel: t('navigation.family') }}
      />
      <Tab.Screen
        name="SOS"
        component={SosScreen}
        options={{ tabBarLabel: t('navigation.sos') }}
      />
      <Tab.Screen
        name="Offline"
        component={OfflineScreen}
        options={{ tabBarLabel: t('navigation.offline') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ tabBarLabel: t('navigation.profile') }}
      />
      {/* Missing Person Finder screen, hidden from the bottom tab bar */}
      <Tab.Screen
        name="MissingPersonFinder"
        component={MissingPersonFinderScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

// Main Drawer Navigator that wraps the Tab Navigator
const MainDrawerNavigator = ({ user, onLogout }: any) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerMenu {...props} onLogout={onLogout} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        initialParams={{ user, onLogout }}
      />
      <Drawer.Screen name="AllReports" component={AllReportsScreen} />
      <Drawer.Screen name="Resources" component={ResourcesScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;