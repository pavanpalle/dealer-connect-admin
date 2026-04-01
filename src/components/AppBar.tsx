import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme';

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: { label: string; onPress: () => void };
}

export default function AppBar({ title, subtitle, onBack, rightAction }: Props) {
  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backIcon}>{'\u2039'}</Text>
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightAction && (
        <TouchableOpacity onPress={rightAction.onPress} style={styles.rightBtn}>
          <Text style={styles.rightText}>{rightAction.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backBtn: { width: 30, height: 30, borderRadius: 8, backgroundColor: Colors.surface2, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 22, fontWeight: '600', color: Colors.ink2, marginTop: -2 },
  title: { fontSize: 18, fontWeight: '800', letterSpacing: -0.4 },
  subtitle: { fontSize: 11, color: Colors.ink3, marginTop: 1, fontWeight: '500' },
  rightBtn: { backgroundColor: Colors.green, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  rightText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
