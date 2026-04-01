import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../theme';
import { formatCurrency, DEALER_NETWORK } from '../data/mockData';
import StatGrid from '../components/StatGrid';
import Card from '../components/Card';

const DAILY_REVENUE = [
  { day: 'Mon', amount: 14200 },
  { day: 'Tue', amount: 18500 },
  { day: 'Wed', amount: 12800 },
  { day: 'Thu', amount: 21000 },
  { day: 'Fri', amount: 16400 },
  { day: 'Sat', amount: 24600 },
  { day: 'Sun', amount: 9200 },
];

const MONTHLY_TREND = [
  { month: 'Oct', amount: 185000 },
  { month: 'Nov', amount: 210000 },
  { month: 'Dec', amount: 172000 },
  { month: 'Jan', amount: 248000 },
  { month: 'Feb', amount: 226000 },
  { month: 'Mar', amount: 289000 },
];

const PRODUCT_REVENUE = [
  { name: 'Milk 500ml', revenue: 98500, pct: 34 },
  { name: 'Milk 1L', revenue: 67200, pct: 23 },
  { name: 'Ghee 500ml', revenue: 52100, pct: 18 },
  { name: 'Curd 400g', revenue: 34800, pct: 12 },
  { name: 'Butter 100g', revenue: 23400, pct: 8 },
  { name: 'Flavored Milk', revenue: 13000, pct: 5 },
];

export default function ReportsScreen() {
  const maxDaily = Math.max(...DAILY_REVENUE.map(d => d.amount));
  const maxMonthly = Math.max(...MONTHLY_TREND.map(d => d.amount));
  const totalRevenue = DEALER_NETWORK.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = DEALER_NETWORK.reduce((s, d) => s + d.orders, 0);
  const avgRating = (DEALER_NETWORK.reduce((s, d) => s + d.rating, 0) / DEALER_NETWORK.length).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>March 2026</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <StatGrid items={[
            { label: 'Total Revenue', value: formatCurrency(totalRevenue), color: Colors.green },
            { label: 'Total Orders', value: String(totalOrders), color: Colors.blue },
            { label: 'Active Dealers', value: String(DEALER_NETWORK.length), color: Colors.purple },
            { label: 'Avg Rating', value: `${avgRating} \u2B50`, color: Colors.amber },
          ]} />
        </View>

        <View style={styles.section}>
          <Card style={{ padding: 14 }}>
            <Text style={styles.chartTitle}>Revenue Trend</Text>
            <Text style={styles.chartSub}>Monthly revenue, last 6 months</Text>
            <View style={styles.barChart}>
              {MONTHLY_TREND.map(d => (
                <View key={d.month} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View style={[styles.bar, { height: `${(d.amount / maxMonthly) * 100}%`, backgroundColor: Colors.green }]} />
                  </View>
                  <Text style={styles.barLabel}>{d.month}</Text>
                  <Text style={styles.barValue}>{'\u20b9'}{Math.round(d.amount / 1000)}K</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={{ padding: 14 }}>
            <Text style={styles.chartTitle}>Daily Revenue</Text>
            <Text style={styles.chartSub}>This week</Text>
            <View style={styles.barChart}>
              {DAILY_REVENUE.map(d => (
                <View key={d.day} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View style={[styles.bar, { height: `${(d.amount / maxDaily) * 100}%`, backgroundColor: Colors.blue }]} />
                  </View>
                  <Text style={styles.barLabel}>{d.day}</Text>
                  <Text style={styles.barValue}>{'\u20b9'}{Math.round(d.amount / 1000)}K</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={{ padding: 14 }}>
            <Text style={styles.chartTitle}>Dealer Performance</Text>
            <Text style={styles.chartSub}>Revenue by dealer</Text>
            {DEALER_NETWORK.map(dealer => {
              const maxRev = Math.max(...DEALER_NETWORK.map(d => d.revenue));
              return (
                <View key={dealer.id} style={styles.dealerRow}>
                  <View style={styles.dealerInfo}>
                    <View style={styles.dealerAvatar}>
                      <Text style={styles.dealerIni}>{dealer.ini}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.dealerName}>{dealer.name}</Text>
                      <View style={styles.dealerBar}>
                        <View style={[styles.dealerBarFill, { width: `${(dealer.revenue / maxRev) * 100}%` }]} />
                      </View>
                    </View>
                  </View>
                  <Text style={styles.dealerRevenue}>{formatCurrency(dealer.revenue)}</Text>
                </View>
              );
            })}
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={{ padding: 14 }}>
            <Text style={styles.chartTitle}>Product Revenue</Text>
            <Text style={styles.chartSub}>Revenue distribution by product</Text>
            {PRODUCT_REVENUE.map(p => (
              <View key={p.name} style={styles.productRow}>
                <View style={{ flex: 1 }}>
                  <View style={styles.productHeader}>
                    <Text style={styles.productName}>{p.name}</Text>
                    <Text style={styles.productPct}>{p.pct}%</Text>
                  </View>
                  <View style={styles.productBar}>
                    <View style={[styles.productBarFill, { width: `${p.pct}%` }]} />
                  </View>
                </View>
                <Text style={styles.productRevenue}>{formatCurrency(p.revenue)}</Text>
              </View>
            ))}
          </Card>
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
  chartTitle: { fontSize: 13, fontWeight: '800' },
  chartSub: { fontSize: 11, color: Colors.ink3, marginTop: 1, marginBottom: 14 },
  barChart: { flexDirection: 'row', gap: 6, height: 130, alignItems: 'flex-end' },
  barCol: { flex: 1, alignItems: 'center' },
  barTrack: { width: '100%', height: 100, justifyContent: 'flex-end', alignItems: 'center' },
  bar: { width: '65%', borderRadius: 4 },
  barLabel: { fontSize: 9, fontWeight: '600', color: Colors.ink3, marginTop: 4 },
  barValue: { fontSize: 8, fontWeight: '700', color: Colors.ink2, marginTop: 1 },
  dealerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dealerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  dealerAvatar: { width: 30, height: 30, borderRadius: 8, backgroundColor: Colors.greenLight, alignItems: 'center', justifyContent: 'center' },
  dealerIni: { fontWeight: '800', fontSize: 10, color: Colors.green },
  dealerName: { fontSize: 11, fontWeight: '700', marginBottom: 3 },
  dealerBar: { height: 4, backgroundColor: Colors.surface2, borderRadius: 2, overflow: 'hidden' },
  dealerBarFill: { height: '100%', backgroundColor: Colors.green, borderRadius: 2 },
  dealerRevenue: { fontSize: 12, fontWeight: '800', color: Colors.green, marginLeft: 8 },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  productHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  productName: { fontSize: 11, fontWeight: '600' },
  productPct: { fontSize: 10, fontWeight: '700', color: Colors.ink3 },
  productBar: { height: 4, backgroundColor: Colors.surface2, borderRadius: 2, overflow: 'hidden' },
  productBarFill: { height: '100%', backgroundColor: Colors.purple, borderRadius: 2 },
  productRevenue: { fontSize: 11, fontWeight: '800', marginLeft: 8 },
});
