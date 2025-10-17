import React from "react";
import { Stack, Link } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Book Eye Test",
      description: "Schedule your appointment",
      icon: "calendar",
      route: "/booking",
      color: colors.primary,
    },
    {
      title: "Track Orders",
      description: "Check your glasses status",
      icon: "bag.fill",
      route: "/orders",
      color: colors.accent,
    },
    {
      title: "My Profile",
      description: "View account details",
      icon: "person.circle.fill",
      route: "/profile",
      color: colors.secondary,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Logo and Welcome Section */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://1drv.ms/i/c/9002c187c5fcf925/ETmTzqhnQqdLsSDnoQMYpJsBxIG1ABUjMFNu2dEycAuY1Q?e=hThBy2' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={commonStyles.title}>VISION SYNC</Text>
          <Text style={[commonStyles.textSecondary, styles.tagline]}>
            Book, Track ,See Clearly!
          </Text>
          
          {user && (
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeText}>Welcome back, {user.firstName}!</Text>
              <Text style={styles.welcomeSubtext}>
                What would you like to do today?
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <Link key={index} href={action.route as any} asChild>
                <TouchableOpacity style={styles.actionCard}>
                  <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                    <IconSymbol name={action.icon as any} size={28} color="white" />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>{action.description}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>

        {/* Branch Information */}
        <View style={styles.branchSection}>
          <Text style={styles.sectionTitle}>Our Branches</Text>
          
          <View style={styles.branchCard}>
            <View style={styles.branchHeader}>
              <IconSymbol name="location.fill" size={24} color={colors.primary} />
              <Text style={styles.branchName}>Pretoria CBD</Text>
            </View>
            <Text style={styles.branchAddress}>
              Shop 12A, Bothongo plaza west, Francis Baard street
            </Text>
            <View style={styles.branchContact}>
              <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
              <Text style={styles.branchPhone}>012 320 3802</Text>
            </View>
          </View>
          
          <View style={styles.branchCard}>
            <View style={styles.branchHeader}>
              <IconSymbol name="location.fill" size={24} color={colors.primary} />
              <Text style={styles.branchName}>Sunnyside</Text>
            </View>
            <Text style={styles.branchAddress}>
              77 Robert sobukwe street (formerly esellen str)
            </Text>
            <View style={styles.branchContact}>
              <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
              <Text style={styles.branchPhone}>012 582 3698</Text>
            </View>
          </View>
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesList}>
            <View style={styles.serviceItem}>
              <IconSymbol name="eye.fill" size={20} color={colors.primary} />
              <Text style={styles.serviceText}>Comprehensive Eye Exams</Text>
            </View>
            <View style={styles.serviceItem}>
              <IconSymbol name="eyeglasses]" size={20} color={colors.primary} />
              <Text style={styles.serviceText}>👓 Prescription Glasses</Text>
            </View>
            <View style={styles.serviceItem}>
              <IconSymbol name="sun.max.fill" size={20} color={colors.primary} />
              <Text style={styles.serviceText}>Sunglasses</Text>
            </View>
            <View style={styles.serviceItem}>
              <IconSymbol name="eye.fill" size={20} color={colors.primary} />
              <Text style={styles.serviceText}>Contact Lenses</Text>
            </View>
          </View>
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
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  tagline: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 24,
  },
  welcomeCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    minWidth: 150,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  branchSection: {
    marginBottom: 32,
  },
  branchCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  branchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  branchName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
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
  servicesSection: {
    marginBottom: 16,
  },
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    gap: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  serviceText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});
