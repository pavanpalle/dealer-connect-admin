import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../theme';
import { useOrders } from '../context/OrderContext';
import { formatCurrency } from '../data/mockData';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import StatusPill from '../components/StatusPill';
import { RootStackParamList, OrderStatus } from '../types';

type Route = RouteProp<RootStackParamList, 'OrderDetail'>;

const NEXT_STATUS: Partial<Record<OrderStatus, { status: OrderStatus; label: string; color: string }>> = {
  pending: { status: 'processing', label: 'Confirm & Process', color: Colors.blue },
  processing: { status: 'delivered', label: 'Mark Delivered', color: Colors.green },
};

export default function OrderDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const { orders, updateStatus, markPaid } = useOrders();
  const order = orders.find(o => o.id === route.params.orderId);

  if (!order) return (
    <View style={styles.container}>
      <AppBar title="Order Detail" onBack={() => navigation.goBack()} />
      <View style={styles.empty}><Text>Order not found</Text></View>
    </View>
  );

  const next = NEXT_STATUS[order.status];

  const handleStatusChange = (newStatus: OrderStatus) => {
    Alert.alert(
      'Update Status',
      `Change order to "${newStatus}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => updateStatus(order.id, newStatus) },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => updateStatus(order.id, 'cancelled') },
      ]
    );
  };

  const handleCollectPayment = () => {
    Alert.alert(
      'Collect Payment',
      `Collect ${formatCurrency(Math.round(order.grand))} from ${order.dname}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Collected', onPress: () => markPaid(order.id) },
      ]
    );
  };

  const timeline = [
    { label: 'Order Placed', time: `${order.date} ${order.time}`, done: true, icon: '\u{1F4CB}' },
    { label: 'Confirmed', time: order.status !== 'pending' ? 'Confirmed by admin' : '', done: order.status !== 'pending' && order.status !== 'cancelled', icon: '\u2705' },
    { label: 'Out for Delivery', time: order.status === 'processing' ? 'In transit' : order.status === 'delivered' ? 'Completed' : '', done: order.status === 'processing' || order.status === 'delivered', icon: '\u{1F69A}' },
    { label: 'Delivered', time: order.status === 'delivered' ? 'Successfully delivered' : '', done: order.status === 'delivered', icon: '\u{1F4E6}' },
  ];

  return (
    <View style={styles.container}>
      <AppBar title={`Order #${order.id}`} subtitle={order.date} onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <Card style={styles.dealerCard}>
            <View style={styles.dealerRow}>
              <View style={styles.dealerAvatar}>
                <Text style={styles.dealerIni}>{order.dini}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.dealerName}>{order.dname}</Text>
                <Text style={styles.dealerLoc}>{order.dloc}</Text>
              </View>
              <StatusPill status={order.status} />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ORDER TIMELINE</Text>
          <Card style={{ padding: 14 }}>
            {timeline.map((step, i) => (
              <View key={step.label} style={styles.timelineRow}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineDot, step.done && styles.timelineDotDone]}>
                    <Text style={{ fontSize: 10 }}>{step.done ? step.icon : '\u25CB'}</Text>
                  </View>
                  {i < timeline.length - 1 && <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineLabel, step.done && styles.timelineLabelDone]}>{step.label}</Text>
                  {step.time ? <Text style={styles.timelineTime}>{step.time}</Text> : null}
                </View>
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ITEMS ({order.items.length})</Text>
          <Card>
            {order.items.map((item, i) => (
              <View key={item.pid} style={[styles.itemRow, i < order.items.length - 1 && styles.itemBorder]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>{item.tier} {'\u00b7'} HSN {item.hsn} {'\u00b7'} GST {item.gst}%</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemQty}>{item.qty} pcs @ {'\u20b9'}{item.eff.toFixed(2)}</Text>
                  <Text style={styles.itemTotal}>{formatCurrency(Math.round(item.qty * item.eff))}</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={{ padding: 14 }}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrency(Math.round(order.sub))}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>GST</Text>
              <Text style={styles.totalValue}>{formatCurrency(Math.round(order.tax))}</Text>
            </View>
            <View style={[styles.totalRow, styles.grandRow]}>
              <Text style={styles.grandLabel}>Grand Total</Text>
              <Text style={styles.grandValue}>{formatCurrency(Math.round(order.grand))}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Payment</Text>
              <View style={[styles.paidPill, { backgroundColor: order.paid ? Colors.greenLight : Colors.amberLight }]}>
                <Text style={[styles.paidText, { color: order.paid ? Colors.green : Colors.amber }]}>
                  {order.paid ? 'Paid' : 'Unpaid'}
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.actionRow}>
            {next && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: next.color, flex: 2 }]}
                onPress={() => handleStatusChange(next.status)}
              >
                <Text style={styles.actionBtnText}>{next.label} {'\u2192'}</Text>
              </TouchableOpacity>
            )}
            {!order.paid && order.status !== 'cancelled' && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: Colors.green, flex: 1 }]}
                onPress={handleCollectPayment}
              >
                <Text style={styles.actionBtnText}>{'\u20b9'} Collect</Text>
              </TouchableOpacity>
            )}
            {order.status !== 'cancelled' && order.status !== 'delivered' && (
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: Colors.redLight, flex: 1, borderWidth: 1, borderColor: Colors.red }]}
                onPress={handleCancel}
              >
                <Text style={[styles.actionBtnText, { color: Colors.red }]}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 14, paddingTop: 12 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.ink3, letterSpacing: 0.7, marginBottom: 8 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dealerCard: { padding: 14 },
  dealerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dealerAvatar: { width: 40, height: 40, borderRadius: 11, backgroundColor: Colors.greenLight, alignItems: 'center', justifyContent: 'center' },
  dealerIni: { fontWeight: '800', fontSize: 13, color: Colors.green },
  dealerName: { fontSize: 14, fontWeight: '800' },
  dealerLoc: { fontSize: 11, color: Colors.ink3, marginTop: 1 },
  timelineRow: { flexDirection: 'row', minHeight: 50 },
  timelineLeft: { width: 30, alignItems: 'center' },
  timelineDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.surface2, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  timelineDotDone: { backgroundColor: Colors.greenLight, borderColor: Colors.green },
  timelineLine: { width: 2, flex: 1, backgroundColor: Colors.border },
  timelineLineDone: { backgroundColor: Colors.green },
  timelineContent: { flex: 1, paddingLeft: 10, paddingBottom: 14 },
  timelineLabel: { fontSize: 12, fontWeight: '600', color: Colors.ink3 },
  timelineLabelDone: { color: Colors.ink, fontWeight: '700' },
  timelineTime: { fontSize: 10, color: Colors.ink3, marginTop: 2 },
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 12, paddingHorizontal: 14 },
  itemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  itemName: { fontSize: 12, fontWeight: '700' },
  itemMeta: { fontSize: 10, color: Colors.ink3, marginTop: 2 },
  itemQty: { fontSize: 10, color: Colors.ink3 },
  itemTotal: { fontSize: 13, fontWeight: '800', marginTop: 2 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalLabel: { fontSize: 12, color: Colors.ink3 },
  totalValue: { fontSize: 12, fontWeight: '600' },
  grandRow: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 8, marginTop: 4 },
  grandLabel: { fontSize: 14, fontWeight: '800' },
  grandValue: { fontSize: 16, fontWeight: '800', color: Colors.green },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: Colors.border },
  paymentLabel: { fontSize: 12, fontWeight: '600' },
  paidPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  paidText: { fontSize: 10, fontWeight: '700' },
  actionRow: { flexDirection: 'row', gap: 8 },
  actionBtn: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
