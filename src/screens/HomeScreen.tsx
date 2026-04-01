import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { useOrders } from '../context/OrderContext';
import { formatCurrency, STOCKIST } from '../data/mockData';
import StatGrid from '../components/StatGrid';
import Card from '../components/Card';
import StatusPill from '../components/StatusPill';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { orders } = useOrders();

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const todayRevenue = orders.reduce((s, o) => s + o.grand, 0);
  const totalOrders = orders.length;
  const pendingCount = pendingOrders.length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SY</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{STOCKIST.owner}</Text>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={{ fontSize: 18 }}>{'\u{1F514}'}</Text>
            {pendingCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pendingCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <StatGrid items={[
            { label: 'Today Revenue', value: formatCurrency(Math.round(todayRevenue)), color: Colors.green },
            { label: 'Total Orders', value: String(totalOrders), color: Colors.blue },
            { label: 'Pending', value: String(pendingCount), color: Colors.amber },
            { label: 'Delivered', value: String(deliveredCount), color: Colors.green },
          ]} />
        </View>

        {pendingCount > 0 && (
          <View style={styles.section}>
            <View style={styles.alertBanner}>
              <View style={styles.alertIcon}>
                <Text style={{ fontSize: 16 }}>{'\u{1F514}'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>{pendingCount} New Order{pendingCount > 1 ? 's' : ''} Pending</Text>
                <Text style={styles.alertSub}>Requires your confirmation</Text>
              </View>
              <TouchableOpacity style={styles.alertBtn}>
                <Text style={styles.alertBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>INCOMING ORDERS</Text>
            <Text style={styles.seeAll}>See all {'\u203A'}</Text>
          </View>
          {orders.slice(0, 4).map(order => (
            <TouchableOpacity
              key={order.id}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
            >
              <Card style={styles.orderCard}>
                <View style={styles.orderRow}>
                  <View style={[styles.dealerAvatar, {
                    backgroundColor: order.status === 'pending' ? Colors.amberLight :
                      order.status === 'processing' ? Colors.blueLight : Colors.greenLight
                  }]}>
                    <Text style={styles.dealerIni}>{order.dini}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.orderDealer}>{order.dname}</Text>
                    <Text style={styles.orderMeta}>#{order.id} {'\u00b7'} {order.items.length} items</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.orderAmount}>{formatCurrency(Math.round(order.grand))}</Text>
                    <StatusPill status={order.status} />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
          <View style={styles.actionsGrid}>
            {[
              { icon: '\u{1F4E6}', label: 'All Orders', bg: Colors.blueLight, color: Colors.blue },
              { icon: '\u{1F69A}', label: 'Dispatch', bg: Colors.greenLight, color: Colors.green },
              { icon: '\u{1F465}', label: 'Dealers', bg: Colors.purpleLight, color: Colors.purple },
              { icon: '\u{1F4CA}', label: 'Reports', bg: Colors.amberLight, color: Colors.amber },
            ].map(action => (
              <TouchableOpacity key={action.label} style={styles.actionBtn} activeOpacity={0.7}>
                <View style={[styles.actionIcon, { backgroundColor: action.bg }]}>
                  <Text style={{ fontSize: 20 }}>{action.icon}</Text>
                </View>
                <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { backgroundColor: Colors.green, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  greeting: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  name: { fontSize: 17, fontWeight: '800', color: '#fff' },
  notifBtn: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 2, right: 2, backgroundColor: Colors.red, width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  scroll: { flex: 1 },
  section: { padding: 13, paddingHorizontal: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.ink3, letterSpacing: 0.7 },
  seeAll: { fontSize: 12, fontWeight: '600', color: Colors.green },
  alertBanner: { backgroundColor: Colors.amberLight, borderWidth: 1, borderColor: '#F5D6A0', borderRadius: 11, padding: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  alertIcon: { width: 34, height: 34, backgroundColor: Colors.amber, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  alertTitle: { fontSize: 13, fontWeight: '800', color: Colors.amber },
  alertSub: { fontSize: 10, color: Colors.amber, marginTop: 1 },
  alertBtn: { backgroundColor: Colors.amber, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8 },
  alertBtnText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  orderCard: { padding: 12, paddingHorizontal: 14, marginBottom: 8 },
  orderRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dealerAvatar: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  dealerIni: { fontWeight: '800', fontSize: 12, color: Colors.ink2 },
  orderDealer: { fontSize: 13, fontWeight: '700' },
  orderMeta: { fontSize: 10, color: Colors.ink3, marginTop: 2 },
  orderAmount: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  actionsGrid: { flexDirection: 'row', gap: 8, marginTop: 8 },
  actionBtn: { flex: 1, alignItems: 'center', gap: 6 },
  actionIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 10, fontWeight: '700' },
});
