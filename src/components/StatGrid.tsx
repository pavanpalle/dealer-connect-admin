import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '../theme';

interface StatItem {
  label: string;
  value: string;
  color: string;
  sub?: string;
}

export default function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <View style={styles.grid}>
      {items.map((item, i) => (
        <View key={i} style={styles.cell}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}</Text>
          <Text style={[styles.value, { color: item.color }]}>{item.value}</Text>
          {item.sub && <Text style={styles.sub}>{item.sub}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    ...Shadows.card,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginBottom: 6 },
  label: { fontSize: 10, fontWeight: '600', color: Colors.ink3, marginBottom: 4 },
  value: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  sub: { fontSize: 9, color: Colors.ink4, marginTop: 2 },
});
