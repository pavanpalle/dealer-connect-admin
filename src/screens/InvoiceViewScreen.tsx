import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../theme';
import { useOrders } from '../context/OrderContext';
import { formatCurrency, STOCKIST } from '../data/mockData';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import { RootStackParamList } from '../types';

type Route = RouteProp<RootStackParamList, 'InvoiceView'>;

export default function InvoiceViewScreen() {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const { orders } = useOrders();
  const order = orders.find(o => o.id === route.params.orderId);

  if (!order) return (
    <View style={styles.container}>
      <AppBar title="Invoice" onBack={() => navigation.goBack()} />
      <View style={styles.empty}><Text>Invoice not found</Text></View>
    </View>
  );

  const cgst = order.tax / 2;
  const sgst = order.tax / 2;

  return (
    <View style={styles.container}>
      <AppBar title="Tax Invoice" subtitle={order.inv} onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <Card style={styles.invoiceCard}>
            <View style={styles.companyHeader}>
              <View style={styles.companyIcon}>
                <Text style={{ fontSize: 22 }}>{'\u{1F3ED}'}</Text>
              </View>
              <View>
                <Text style={styles.companyName}>{STOCKIST.name}</Text>
                <Text style={styles.companyGstin}>GSTIN: {STOCKIST.gstin}</Text>
              </View>
            </View>

            <View style={styles.invoiceInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Invoice No</Text>
                <Text style={styles.infoValue}>{order.inv}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{order.date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Order</Text>
                <Text style={styles.infoValue}>#{order.id}</Text>
              </View>
            </View>

            <View style={styles.billTo}>
              <Text style={styles.billLabel}>BILL TO</Text>
              <Text style={styles.billName}>{order.dname}</Text>
              <Text style={styles.billDetail}>{order.dloc}</Text>
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.th, { flex: 2 }]}>Item</Text>
                <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Qty</Text>
                <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Rate</Text>
                <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Amount</Text>
              </View>
              {order.items.map(item => (
                <View key={item.pid} style={styles.tableRow}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.tdItem}>{item.name}</Text>
                    <Text style={styles.tdMeta}>HSN: {item.hsn} | GST: {item.gst}%</Text>
                  </View>
                  <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>{item.qty}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>{'\u20b9'}{item.eff.toFixed(2)}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: 'right', fontWeight: '700' }]}>{formatCurrency(Math.round(item.qty * item.eff))}</Text>
                </View>
              ))}
            </View>

            <View style={styles.totals}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>{formatCurrency(Math.round(order.sub))}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>CGST</Text>
                <Text style={styles.totalValue}>{formatCurrency(Math.round(cgst))}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>SGST</Text>
                <Text style={styles.totalValue}>{formatCurrency(Math.round(sgst))}</Text>
              </View>
              <View style={[styles.totalRow, styles.grandRow]}>
                <Text style={styles.grandLabel}>Grand Total</Text>
                <Text style={styles.grandValue}>{formatCurrency(Math.round(order.grand))}</Text>
              </View>
            </View>

            <View style={[styles.paymentStatus, { backgroundColor: order.paid ? Colors.greenLight : Colors.amberLight }]}>
              <Text style={[styles.paymentText, { color: order.paid ? Colors.green : Colors.amber }]}>
                {order.paid ? '\u2705 Payment Received' : '\u23F3 Payment Pending'}
              </Text>
            </View>

            <View style={styles.bankDetails}>
              <Text style={styles.bankTitle}>BANK DETAILS</Text>
              <Text style={styles.bankText}>Bank: State Bank of India</Text>
              <Text style={styles.bankText}>A/C: 1234567890</Text>
              <Text style={styles.bankText}>IFSC: SBIN0001234</Text>
              <Text style={styles.bankText}>Branch: Hyderabad Main</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.downloadBtn} onPress={() => Alert.alert('Download', 'Downloading PDF...')}>
            <Text style={styles.downloadText}>{'\u{1F4E5}'} Download PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn} onPress={() => Alert.alert('Share', 'Sharing invoice...')}>
            <Text style={styles.shareText}>{'\u{1F4E4}'} Share Invoice</Text>
          </TouchableOpacity>
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
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  invoiceCard: { padding: 16 },
  companyHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  companyIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.greenLight, alignItems: 'center', justifyContent: 'center' },
  companyName: { fontSize: 16, fontWeight: '800' },
  companyGstin: { fontSize: 10, color: Colors.ink3, marginTop: 1 },
  invoiceInfo: { backgroundColor: Colors.surface2, borderRadius: 8, padding: 10, gap: 4, marginBottom: 14 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { fontSize: 11, color: Colors.ink3 },
  infoValue: { fontSize: 11, fontWeight: '700' },
  billTo: { marginBottom: 14 },
  billLabel: { fontSize: 9, fontWeight: '700', color: Colors.ink3, letterSpacing: 0.7, marginBottom: 4 },
  billName: { fontSize: 13, fontWeight: '700' },
  billDetail: { fontSize: 11, color: Colors.ink3, marginTop: 1 },
  table: { borderWidth: 1, borderColor: Colors.border, borderRadius: 8, overflow: 'hidden', marginBottom: 14 },
  tableHeader: { flexDirection: 'row', backgroundColor: Colors.surface2, padding: 8 },
  th: { fontSize: 9, fontWeight: '700', color: Colors.ink3, textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderTopColor: Colors.border, alignItems: 'center' },
  td: { fontSize: 11 },
  tdItem: { fontSize: 11, fontWeight: '600' },
  tdMeta: { fontSize: 9, color: Colors.ink4, marginTop: 1 },
  totals: { marginBottom: 14 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  totalLabel: { fontSize: 12, color: Colors.ink3 },
  totalValue: { fontSize: 12, fontWeight: '600' },
  grandRow: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 8, marginTop: 4 },
  grandLabel: { fontSize: 14, fontWeight: '800' },
  grandValue: { fontSize: 16, fontWeight: '800', color: Colors.green },
  paymentStatus: { padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 14 },
  paymentText: { fontSize: 12, fontWeight: '700' },
  bankDetails: { backgroundColor: Colors.surface2, borderRadius: 8, padding: 10 },
  bankTitle: { fontSize: 9, fontWeight: '700', color: Colors.ink3, letterSpacing: 0.7, marginBottom: 6 },
  bankText: { fontSize: 10, color: Colors.ink2, marginBottom: 2 },
  downloadBtn: { backgroundColor: Colors.green, paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  downloadText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  shareBtn: { backgroundColor: Colors.surface, paddingVertical: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  shareText: { color: Colors.ink2, fontSize: 14, fontWeight: '700' },
});
