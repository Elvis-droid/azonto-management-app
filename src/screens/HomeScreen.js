import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { gradients, colors } from '../theme/colors';
import GradientCard from '../components/GradientCard';
import StatTile from '../components/StatTile';
import { useAuth } from '../context/AuthContext';
import { useStock } from '../context/StockContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { getOverallTotals, getMonthlyProfit } = useStock();

  const totals = getOverallTotals();
  const monthly = getMonthlyProfit();

  return (
    <LinearGradient colors={gradients.background} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.username}>{user?.username?.toUpperCase()}</Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.brand}>AZONTO MANAGEMENT APP</Text>

        <View style={styles.statsRow}>
          <StatTile label="Products Tracked" value={`${totals.totalProductsTracked}`} color={colors.primary} />
          <StatTile label="Stock Value" value={`Tsh ${totals.totalStockValue.toFixed(0)}`} color={colors.accent} />
          <StatTile label="This Month Profit" value={`Tsh ${monthly.totalProfit.toFixed(0)}`} color={colors.success} />
        </View>

        <Text style={styles.sectionLabel}>CATEGORIES</Text>

        <GradientCard
          title="Stock In / Goods In"
          subtitle="Add new stock that enters the business"
          icon="arrow-down-circle"
          gradientColors={gradients.stockIn}
          onPress={() => navigation.navigate('StockIn')}
        />

        <GradientCard
          title="Stock Out / Goods Out"
          subtitle="Record stock sold out of the business"
          icon="arrow-up-circle"
          gradientColors={gradients.stockOut}
          onPress={() => navigation.navigate('StockOut')}
        />

        <GradientCard
          title="Management"
          subtitle="Track remaining stock, days in stock & profit"
          icon="bar-chart"
          gradientColors={gradients.management}
          onPress={() => navigation.navigate('Management')}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  greeting: { color: colors.textSecondary, fontSize: 13 },
  username: { color: colors.white, fontSize: 22, fontWeight: '800', letterSpacing: 1 },
  logoutBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  brand: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 14,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 28,
    marginHorizontal: -6,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 14,
  },
});
