import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Colors } from '../theme';
import { useOrders } from '../context/OrderContext';
import { formatCurrency, FLEET } from '../data/mockData';
import Card from '../components/Card';
import StatusPill from '../components/StatusPill';

const FLEET_STATUS_CONFIG: Record<string, { bg: string; color: string; label: string; icon: string }> = {
  en_route: { bg: Colors.blueLight, color: Colors.blue, label: 'En Route', icon: '\u{1F69A}' },
  loading: { bg: Colors.amberLight, color: Colors.amber, label: 'Loading', icon: '\u{1F4E6}' },
  available: { bg: Colors.greenLight, color: Colors.green, label: 'Available', icon: '\u2705' },
};

export default function DispatchScreen() {
  const { orders, updateStatus } = useOrders();
  const pendingDispatch = orders.filter(o => o.status === 'processing');
  const readyToDispatch = orders.filter(o => o.status === 'pending');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dispatch & Fleet</Text>
        <Text style={styles.subtitle}>Manage deliveries & vehicles</Text>
      </View>
      <ScrollView style={styles.scroll}>
        {pendingDispatch.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>READY TO DISPATCH ({pendingDispatch.length})</Text>
            {pendingDispatch.map(order => (
              <Card key={order.id} style={styles.dispatchCard}>
                <View style={styles.dispatchRow}>
                  <View style={styles.dealerAvatar}>
                    <Text style={styles.dealerIni}>{order.dini}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dealerName}>{order.dname}</Text>
                    <Text style={styles.orderMeta}>#{order.id} {'\u00b7'} {order.items.length} items {'\u00b7'} {formatCurrency(Math.round(order.grand))}</Text>
                  </View>
                  <StatusPill status={order.status} />
                </View>
                <View style={styles.dispatchActions}>
                  <TouchableOpacity
                    style={styles.assignBtn}
                    onPress={() => Alert.alert('Assign', `Assign vehicle to order #${order.id}?`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Assign & Dispatch', onPress: () => {} },
                    ])}
                  >
                    <Text style={styles.assignBtnText}>{'\u{1F69A}'} Assign Vehicle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deliverBtn}
                    onPress={() => Alert.alert('Deliver', `Mark order #${order.id} as delivered?`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Confirm', onPress: () => updateStatus(order.id, 'delivered') },
                    ])}
                  >
                    <Text style={styles.deliverBtnText}>Mark Delivered</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {readyToDispatch.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>AWAITING CONFIRMATION ({readyToDispatch.length})</Text>
            {readyToDispatch.map(order => (
              <Card key={order.id} style={styles.dispatchCard}>
                <View style={styles.dispatchRow}>
                  <View style={[styles.dealerAvatar, { backgroundColor: Colors.amberLight }]}>
                    <Text style={styles.dealerIni}>{order.dini}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dealerName}>{order.dname}</Text>
                    <Text style={styles.orderMeta}>#{order.id} {'\u00b7'} {order.items.length} items {'\u00b7'} {formatCurrency(Math.round(order.grand))}</Text>
                  </View>
                  <StatusPill status={order.status} />
                </View>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => Alert.alert('Confirm', `Confirm order #${order.id}?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Confirm', onPress: () => updateStatus(order.id, 'processing') },
                  ])}
                >
                  <Text style={styles.confirmBtnText}>Confirm Order {'\u2192'}</Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FLEET STATUS</Text>
          {FLEET.map(vehicle => {
            const cfg = FLEET_STATUS_CONFIG[vehicle.status] || FLEET_STATUS_CONFIG.available;
            return (
              <Card key={vehicle.id} style={styles.fleetCard}>
                <View style={styles.fleetHeader}>
                  <View style={[styles.fleetIcon, { backgroundColor: cfg.bg }]}>
                    <Text style={{ fontSize: 18 }}>{cfg.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fleetName}>{vehicle.name}</Text>
                    <Text style={styles.fleetDriver}>{'\u{1F464}'} {vehicle.driver}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                    <Text style={[styles.statusBadgeText, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                </View>
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Deliveries</Text>
                    <Text style={styles.progressCount}>{vehicle.deliveries}/{vehicle.total}</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${vehicle.progress}%`, backgroundColor: cfg.color }]} />
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { backgroundColor: Colors.surface, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  title: { fontSize: 19, fontWeight: '800', letterSpacing: -0.4 },
  subtitle: { fontSize: 11, color: Colors.ink3, marginTop: 2, fontWeight: '500' },
  scroll: { flex: 1 },
  section: { padding: 13, paddingHorizontal: 14 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.ink3, letterSpacing: 0.7, marginBottom: 8 },
  dispatchCard: { padding: 14, marginBottom: 8 },
  dispatchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  dealerAvatar: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.blueLight, alignItems: 'center', justifyContent: 'center' },
  dealerIni: { fontWeight: '800', fontSize: 12, color: Colors.ink2 },
  dealerName: { fontSize: 13, fontWeight: '700' },
  orderMeta: { fontSize: 10, color: Colors.ink3, marginTop: 2 },
  dispatchActions: { flexDirection: 'row', gap: 8 },
  assignBtn: { flex: 1, backgroundColor: Colors.blueLight, paddingVertical: 8, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: Colors.blue },
  assignBtnText: { fontSize: 11, fontWeight: '700', color: Colors.blue },
  deliverBtn: { flex: 1, backgroundColor: Colors.green, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  deliverBtnText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  confirmBtn: { backgroundColor: Colors.blue, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  confirmBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  fleetCard: { padding: 14, marginBottom: 8 },
  fleetHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  fleetIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  fleetName: { fontSize: 12, fontWeight: '700' },
  fleetDriver: { fontSize: 10, color: Colors.ink3, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusBadgeText: { fontSize: 10, fontWeight: '700' },
  progressSection: {},
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 10, color: Colors.ink3, fontWeight: '600' },
  progressCount: { fontSize: 10, fontWeight: '700' },
  progressBar: { height: 6, backgroundColor: Colors.surface2, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
});
