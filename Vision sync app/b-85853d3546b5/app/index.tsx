
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/LoadingScreen';

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Loading Vision Sync..." />;
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/auth/signin" />;
}
