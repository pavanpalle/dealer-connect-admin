import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import { OrderStatus } from '../types';

const STATUS_CONFIG: Record<OrderStatus, { bg: string; color: string; label: string }> = {
  pending: { bg: Colors.amberLight, color: Colors.amber, label: 'Pending' },
  processing: { bg: Colors.blueLight, color: Colors.blue, label: 'Processing' },
  delivered: { bg: Colors.greenLight, color: Colors.green, label: 'Delivered' },
  cancelled: { bg: Colors.redLight, color: Colors.red, label: 'Cancelled' },
};

export default function StatusPill({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <View style={[styles.pill, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.text, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  text: { fontSize: 10, fontWeight: '700' },
});
