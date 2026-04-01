import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OrderProvider } from './src/context/OrderContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <OrderProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </OrderProvider>
    </SafeAreaProvider>
  );
}
