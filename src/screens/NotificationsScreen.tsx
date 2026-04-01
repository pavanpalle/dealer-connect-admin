import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { useOrders } from '../context/OrderContext';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const STATUS_ICON: Record<string, string> = {
  pending: '\u{1F4CB}',
  processing: '\u{1F69A}',
  delivered: '\u{1F4E6}',
  cancelled: '\u274C',
};

const NOTIF_MSG: Record<string, string> = {
  pending: 'New order received from',
  processing: 'Order confirmed for',
  delivered: 'Order delivered to',
  cancelled: 'Order cancelled by',
};

export default function NotificationsScreen() {
  const navigation = useNavigation<Nav>();
  const { orders } = useOrders();

  return (
    <View style={styles.container}>
      <AppBar title="Notifications" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {orders.map(order => (
          <TouchableOpacity
            key={order.id}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
          >
            <Card style={styles.notifCard}>
              <View style={styles.notifRow}>
                <View style={[styles.notifIcon, {
                  backgroundColor: order.status === 'pending' ? Colors.amberLight :
                    order.status === 'processing' ? Colors.blueLight :
                    order.status === 'delivered' ? Colors.greenLight : Colors.redLight
                }]}>
                  <Text style={{ fontSize: 16 }}>{STATUS_ICON[order.status]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifTitle}>
                    {NOTIF_MSG[order.status]} {order.dname}
                  </Text>
                  <Text style={styles.notifMeta}>#{order.id} {'\u00b7'} {order.date} {'\u00b7'} {order.time}</Text>
                </View>
                <Text style={styles.notifArrow}>{'\u203A'}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {orders.length === 0 && (
          <View style={styles.empty}>
            <Text style={{ fontSize: 32 }}>{'\u{1F514}'}</Text>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { padding: 14, gap: 10 },
  notifCard: { padding: 12, paddingHorizontal: 14 },
  notifRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  notifIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  notifTitle: { fontSize: 12, fontWeight: '600', lineHeight: 17 },
  notifMeta: { fontSize: 10, color: Colors.ink3, marginTop: 3 },
  notifArrow: { fontSize: 20, color: Colors.ink4 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 14, fontWeight: '700', marginTop: 12 },
});
