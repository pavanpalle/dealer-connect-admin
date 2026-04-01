import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme';
import { useOrders } from '../context/OrderContext';
import { formatCurrency } from '../data/mockData';
import Card from '../components/Card';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function InvoicesScreen() {
  const navigation = useNavigation<Nav>();
  const { orders } = useOrders();
  const invoiced = orders.filter(o => o.inv);
  const totalPaid = invoiced.filter(o => o.paid).reduce((s, o) => s + o.grand, 0);
  const totalUnpaid = invoiced.filter(o => !o.paid).reduce((s, o) => s + o.grand, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoices</Text>
        <Text style={styles.subtitle}>{invoiced.length} invoices generated</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: Colors.greenLight, borderColor: '#A8E6CF' }]}>
          <Text style={[styles.summaryLabel, { color: Colors.green }]}>Collected</Text>
          <Text style={[styles.summaryValue, { color: Colors.green }]}>{formatCurrency(Math.round(totalPaid))}</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: Colors.amberLight, borderColor: '#F5D6A0' }]}>
          <Text style={[styles.summaryLabel, { color: Colors.amber }]}>Pending</Text>
          <Text style={[styles.summaryValue, { color: Colors.amber }]}>{formatCurrency(Math.round(totalUnpaid))}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {invoiced.map(order => (
          <TouchableOpacity key={order.id} activeOpacity={0.7} onPress={() => navigation.navigate('InvoiceView', { orderId: order.id })}>
            <Card style={styles.invCard}>
              <View style={styles.invRow}>
                <View style={styles.invIcon}>
                  <Text style={{ fontSize: 16 }}>{'\u{1F4C4}'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.invNumber}>{order.inv}</Text>
                  <Text style={styles.invDealer}>{order.dname} {'\u00b7'} {order.dloc}</Text>
                  <Text style={styles.invMeta}>#{order.id} {'\u00b7'} {order.date}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.invAmount}>{formatCurrency(Math.round(order.grand))}</Text>
                  <View style={[styles.paidPill, { backgroundColor: order.paid ? Colors.greenLight : Colors.amberLight }]}>
                    <Text style={[styles.paidText, { color: order.paid ? Colors.green : Colors.amber }]}>
                      {order.paid ? 'Paid' : 'Unpaid'}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
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
  summaryRow: { flexDirection: 'row', gap: 8, padding: 14 },
  summaryCard: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1 },
  summaryLabel: { fontSize: 10, fontWeight: '600' },
  summaryValue: { fontSize: 17, fontWeight: '800', marginTop: 2 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, gap: 10 },
  invCard: { padding: 14 },
  invRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  invIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.purpleLight, alignItems: 'center', justifyContent: 'center' },
  invNumber: { fontSize: 13, fontWeight: '800', color: Colors.green },
  invDealer: { fontSize: 11, fontWeight: '600', marginTop: 1 },
  invMeta: { fontSize: 10, color: Colors.ink3, marginTop: 1 },
  invAmount: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  paidPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  paidText: { fontSize: 10, fontWeight: '700' },
});
