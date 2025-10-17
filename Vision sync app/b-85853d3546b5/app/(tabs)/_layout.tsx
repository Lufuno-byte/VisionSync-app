import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import AuthGuard from '@/components/AuthGuard';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'booking',
      route: '/(tabs)/booking',
      icon: 'calendar',
      label: 'Book',
    },
    {
      name: 'orders',
      route: '/(tabs)/orders',
      icon: 'bag.fill',
      label: 'Orders',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <AuthGuard>
        <NativeTabs>
          <NativeTabs.Trigger name="(home)">
            <Icon sf="house.fill" drawable="ic_home" />
            <Label>Home</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="booking">
            <Icon sf="calendar" drawable="ic_calendar" />
            <Label>Book</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="orders">
            <Icon sf="bag.fill" drawable="ic_bag" />
            <Label>Orders</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="profile">
            <Icon sf="person.fill" drawable="ic_profile" />
            <Label>Profile</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      </AuthGuard>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <AuthGuard>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none', // Remove fade animation to prevent black screen flash
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="booking" />
        <Stack.Screen name="orders" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </AuthGuard>
  );
}
