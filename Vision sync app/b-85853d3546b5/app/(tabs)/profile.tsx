import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth/signin');
          },
        },
      ]
    );
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.profileHeader}>
          <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <IconSymbol name="person.fill" size={20} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>{user.firstName} {user.lastName}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <IconSymbol name="envelope.fill" size={20} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
            </View>
            
            {user.phone && (
              <View style={styles.infoRow}>
                <IconSymbol name="phone.fill" size={20} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}> Preferd Branch Information</Text>
          
          <View style={styles.branchCard}>
            <Text style={styles.branchName}>Pretoria CBD</Text>
            <Text style={styles.branchAddress}>Shop 12A, Bothongo plaza west, Francis Baard street</Text>
            <View style={styles.branchContact}>
              <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
              <Text style={styles.branchPhone}>012 320 3802</Text>
            </View>
          </View>
          
          <View style={styles.branchCard}>
            <Text style={styles.branchName}>Sunnyside</Text>
            <Text style={styles.branchAddress}> 77 Robert sobukwe street (formerly esellen str)</Text>
            <View style={styles.branchContact}>
              <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
              <Text style={styles.branchPhone}>012 582 3698</Text>
            </View>
          </View>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={[buttonStyles.outline, styles.logoutButton]}
            onPress={handleLogout}
          >
            <IconSymbol name="arrow.right.square" size={20} color={colors.primary} />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  branchCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  branchName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  branchAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  branchContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  branchPhone: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  logoutSection: {
    marginTop: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  logoutButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
