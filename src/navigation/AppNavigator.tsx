import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme';
import { RootStackParamList } from '../types';

import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import DispatchScreen from '../screens/DispatchScreen';
import DealersScreen from '../screens/DealersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import InvoicesScreen from '../screens/InvoicesScreen';
import InvoiceViewScreen from '../screens/InvoiceViewScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '\u{1F3E0}',
    Orders: '\u{1F4E6}',
    Dispatch: '\u{1F69A}',
    Dealers: '\u{1F465}',
    Reports: '\u{1F4CA}',
  };
  return (
    <View style={styles.tabIconWrap}>
      <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
        {icons[label] || '\u25CF'}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} /> }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Orders" focused={focused} /> }}
      />
      <Tab.Screen
        name="DispatchTab"
        component={DispatchScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Dispatch" focused={focused} /> }}
      />
      <Tab.Screen
        name="DealersTab"
        component={DealersScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Dealers" focused={focused} /> }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Reports" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="InvoiceView" component={InvoiceViewScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ animation: 'slide_from_right' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 70,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabIconWrap: { alignItems: 'center', gap: 2 },
  tabIcon: { fontSize: 20 },
  tabIconActive: { transform: [{ scale: 1.1 }] },
  tabLabel: { fontSize: 10, fontWeight: '600', color: Colors.ink3 },
  tabLabelActive: { color: Colors.green, fontWeight: '700' },
});
