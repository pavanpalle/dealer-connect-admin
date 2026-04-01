import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { useOrders } from '../context/OrderContext';
import { formatCurrency } from '../data/mockData';
import Card from '../components/Card';
import StatusPill from '../components/StatusPill';
import { OrderStatus, RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const TABS: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function OrdersScreen() {
  const navigation = useNavigation<Nav>();
  const { orders } = useOrders();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>{orders.length} total orders</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={styles.tabContent}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, filter === tab.value && styles.tabActive]}
            onPress={() => setFilter(tab.value)}
          >
            <Text style={[styles.tabText, filter === tab.value && styles.tabTextActive]}>
              {tab.label}
              {tab.value !== 'all' && ` (${orders.filter(o => o.status === tab.value).length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {filtered.map(order => (
          <TouchableOpacity
            key={order.id}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
          >
            <Card style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View style={styles.dealerAvatar}>
                  <Text style={styles.dealerIni}>{order.dini}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dealerName}>{order.dname}</Text>
                  <Text style={styles.dealerLoc}>{order.dloc}</Text>
                </View>
                <StatusPill status={order.status} />
              </View>
              <View style={styles.orderMeta}>
                <Text style={styles.metaText}>#{order.id}</Text>
                <Text style={styles.metaDot}>{'\u00b7'}</Text>
                <Text style={styles.metaText}>{order.date}</Text>
                <Text style={styles.metaDot}>{'\u00b7'}</Text>
                <Text style={styles.metaText}>{order.items.length} items</Text>
              </View>
              <View style={styles.orderFooter}>
                <Text style={styles.orderAmount}>{formatCurrency(Math.round(order.grand))}</Text>
                <View style={[styles.paidPill, { backgroundColor: order.paid ? Colors.greenLight : Colors.amberLight }]}>
                  <Text style={[styles.paidText, { color: order.paid ? Colors.green : Colors.amber }]}>
                    {order.paid ? 'Paid' : 'Unpaid'}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={{ fontSize: 32 }}>{'\u{1F4E6}'}</Text>
            <Text style={styles.emptyText}>No {filter} orders</Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { backgroundColor: Colors.surface, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8, borderBottomWidth: 0 },
  title: { fontSize: 19, fontWeight: '800', letterSpacing: -0.4 },
  subtitle: { fontSize: 11, color: Colors.ink3, marginTop: 2, fontWeight: '500' },
  tabBar: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border, maxHeight: 46 },
  tabContent: { paddingHorizontal: 14, paddingVertical: 8, gap: 6 },
  tab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: Colors.surface2 },
  tabActive: { backgroundColor: Colors.green },
  tabText: { fontSize: 12, fontWeight: '600', color: Colors.ink3 },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 14, gap: 10 },
  orderCard: { padding: 14 },
  orderHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  dealerAvatar: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.greenLight, alignItems: 'center', justifyContent: 'center' },
  dealerIni: { fontWeight: '800', fontSize: 12, color: Colors.green },
  dealerName: { fontSize: 13, fontWeight: '700' },
  dealerLoc: { fontSize: 10, color: Colors.ink3, marginTop: 1 },
  orderMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  metaText: { fontSize: 11, color: Colors.ink3, fontWeight: '500' },
  metaDot: { color: Colors.ink4 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderAmount: { fontSize: 16, fontWeight: '800' },
  paidPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  paidText: { fontSize: 10, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 14, fontWeight: '700', marginTop: 12 },
});
