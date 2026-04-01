import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { Colors, Radius, Shadows } from '../theme';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
});
