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
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

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
const Drawer = createDrawerNavigator();

// Define the type for the nested Dashboard Stack
export type DashboardStackParamList = {
  DashboardHome: { username: string };
  ReportHazard: undefined;
  Donate: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  AddPersonal: undefined;
  AddMedical: undefined;
  ProfileConfirmation: undefined;
};

// Define the navigation stack for the Dashboard tab
const DashboardStackScreen = ({ route }: any) => {
  const { username } = route.params;
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen
        name="DashboardHome"
        component={DashboardScreen}
        initialParams={{ username }}
      />
      <DashboardStack.Screen name="ReportHazard" component={ReportHazardScreen} />
      <DashboardStack.Screen name="Donate" component={DonationScreen} />
    </DashboardStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();

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

// Main Tab Navigator
const MainTabs = ({ route }: any) => {
  const { username } = route.params;
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = color;
          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              break;
            case 'Family':
              iconName = focused ? 'account-group' : 'account-group-outline';
              iconColor = '#999'; // Make the icon gray to indicate it's inactive
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
            default:
              iconName = 'help-circle';
          }
          return <Icon name={iconName} size={size} color={iconColor} />;
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
        initialParams={{ username }}
        options={{ tabBarLabel: t('navigation.dashboard') }}
      />
      {/* The Family tab is disabled by setting a custom, non-interactive button */}
      <Tab.Screen
        name="Family"
        component={() => null} // Point to a dummy component
        options={{
          tabBarLabel: t('navigation.family'),
          tabBarButton: (props) => (
            <View {...props} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {props.children}
            </View>
          ),
        }}
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
    </Tab.Navigator>
  );
};

// Main Drawer Navigator that wraps the Tab Navigator
const MainDrawerNavigator = ({ route }: any) => {
  const { username } = route.params;
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerMenu {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        initialParams={{ username }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;