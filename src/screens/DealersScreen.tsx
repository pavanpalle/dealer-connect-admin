import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Colors } from '../theme';
import { DEALER_NETWORK, formatCurrency } from '../data/mockData';
import Card from '../components/Card';

export default function DealersScreen() {
  const [search, setSearch] = useState('');
  const filtered = DEALER_NETWORK.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.lid.toLowerCase().includes(search.toLowerCase()) ||
    d.loc.toLowerCase().includes(search.toLowerCase())
  );

  const totalDealers = DEALER_NETWORK.length;
  const totalRevenue = DEALER_NETWORK.reduce((s, d) => s + d.revenue, 0);
  const totalOutstanding = DEALER_NETWORK.reduce((s, d) => s + d.outstanding, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dealer Network</Text>
        <Text style={styles.subtitle}>{totalDealers} active dealers</Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="\u{1F50D} Search dealers..."
          placeholderTextColor={Colors.ink4}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: Colors.greenLight }]}>
          <Text style={[styles.summaryLabel, { color: Colors.green }]}>Total Revenue</Text>
          <Text style={[styles.summaryValue, { color: Colors.green }]}>{formatCurrency(totalRevenue)}</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: totalOutstanding > 0 ? Colors.amberLight : Colors.greenLight }]}>
          <Text style={[styles.summaryLabel, { color: totalOutstanding > 0 ? Colors.amber : Colors.green }]}>Outstanding</Text>
          <Text style={[styles.summaryValue, { color: totalOutstanding > 0 ? Colors.amber : Colors.green }]}>{formatCurrency(totalOutstanding)}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {filtered.map(dealer => (
          <Card key={dealer.id} style={styles.dealerCard}>
            <View style={styles.dealerHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{dealer.ini}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.dealerName}>{dealer.name}</Text>
                <Text style={styles.dealerMeta}>{dealer.lid} {'\u00b7'} {dealer.loc}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{'\u2B50'} {dealer.rating}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCell}>
                <Text style={styles.statLabel}>Orders</Text>
                <Text style={styles.statValue}>{dealer.orders}</Text>
              </View>
              <View style={[styles.statCell, styles.statBorder]}>
                <Text style={styles.statLabel}>Revenue</Text>
                <Text style={[styles.statValue, { color: Colors.green }]}>{formatCurrency(dealer.revenue)}</Text>
              </View>
              <View style={styles.statCell}>
                <Text style={styles.statLabel}>Outstanding</Text>
                <Text style={[styles.statValue, { color: dealer.outstanding > 0 ? Colors.red : Colors.green }]}>
                  {dealer.outstanding > 0 ? formatCurrency(dealer.outstanding) : '\u20b90'}
                </Text>
              </View>
            </View>

            {dealer.outstanding > 0 && (
              <TouchableOpacity
                style={styles.collectBtn}
                onPress={() => Alert.alert('Collect', `Collect ${formatCurrency(dealer.outstanding)} from ${dealer.name}?`, [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Mark Collected', onPress: () => {} },
                ])}
              >
                <Text style={styles.collectBtnText}>{'\u20b9'} Collect Dues</Text>
              </TouchableOpacity>
            )}
          </Card>
        ))}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={{ fontSize: 32 }}>{'\u{1F465}'}</Text>
            <Text style={styles.emptyText}>No dealers found</Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { backgroundColor: Colors.surface, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  title: { fontSize: 19, fontWeight: '800', letterSpacing: -0.4 },
  subtitle: { fontSize: 11, color: Colors.ink3, marginTop: 2, fontWeight: '500' },
  searchWrap: { backgroundColor: Colors.surface, paddingHorizontal: 14, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  searchInput: { backgroundColor: Colors.surface2, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 13, borderWidth: 1, borderColor: Colors.border },
  summaryRow: { flexDirection: 'row', gap: 8, padding: 14 },
  summaryCard: { flex: 1, padding: 12, borderRadius: 10 },
  summaryLabel: { fontSize: 10, fontWeight: '600' },
  summaryValue: { fontSize: 16, fontWeight: '800', marginTop: 2 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, gap: 10 },
  dealerCard: { padding: 14 },
  dealerHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  avatar: { width: 42, height: 42, borderRadius: 12, backgroundColor: Colors.purpleLight, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '800', fontSize: 14, color: Colors.purple },
  dealerName: { fontSize: 14, fontWeight: '800' },
  dealerMeta: { fontSize: 10, color: Colors.ink3, marginTop: 2 },
  ratingBadge: { backgroundColor: Colors.amberLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  ratingText: { fontSize: 10, fontWeight: '700', color: Colors.amber },
  statsRow: { flexDirection: 'row', backgroundColor: Colors.surface2, borderRadius: 8, overflow: 'hidden', marginBottom: 10 },
  statCell: { flex: 1, padding: 10, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: Colors.border },
  statLabel: { fontSize: 9, fontWeight: '600', color: Colors.ink3 },
  statValue: { fontSize: 13, fontWeight: '800', marginTop: 2 },
  collectBtn: { backgroundColor: Colors.amberLight, paddingVertical: 8, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#F5D6A0' },
  collectBtnText: { fontSize: 12, fontWeight: '700', color: Colors.amber },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 14, fontWeight: '700', marginTop: 12 },
});
