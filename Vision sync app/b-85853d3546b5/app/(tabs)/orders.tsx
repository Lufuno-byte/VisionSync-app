
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { createDemoOrders } from '@/utils/demoData';

interface Order {
  id: string;
  orderNumber: string;
  type: 'glasses' | 'contact_lenses' | 'sunglasses';
  status: 'ordered' | 'processing' | 'ready' | 'completed';
  orderDate: string;
  estimatedCompletion: string;
  branch: string;
  description: string;
  progress: number;
}

const statusColors = {
  ordered: colors.textSecondary,
  processing: colors.accent,
  ready: colors.success,
  completed: colors.primary,
};

const statusLabels = {
  ordered: 'Order Placed',
  processing: 'In Progress',
  ready: 'Ready for Pickup',
  completed: 'Completed',
};

const typeIcons = {
  glasses: 'eyeglasses',
  contact_lenses: 'eye.fill',
  sunglasses: 'sun.max.fill',
};

export default function OrdersScreen() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    // Simulate loading orders from API
    setTimeout(() => {
      setOrders(createDemoOrders());
    }, 500);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadOrders();
      setRefreshing(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusSteps = (status: Order['status']) => {
    const steps = [
      { key: 'ordered', label: 'Ordered', completed: true },
      { key: 'processing', label: 'Processing', completed: status !== 'ordered' },
      { key: 'ready', label: 'Ready', completed: status === 'ready' || status === 'completed' },
      { key: 'completed', label: 'Picked Up', completed: status === 'completed' },
    ];
    return steps;
  };

  const renderProgressBar = (progress: number) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderTitleRow}>
          <IconSymbol 
            name={typeIcons[order.type] as any} 
            size={24} 
            color={colors.primary} 
          />
          <View style={styles.orderTitleInfo}>
            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
            <Text style={styles.orderDescription}>{order.description}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[order.status] }]}>
            <Text style={styles.statusText}>{statusLabels[order.status]}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
          <Text style={styles.detailLabel}>Order Date:</Text>
          <Text style={styles.detailValue}>{formatDate(order.orderDate)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <IconSymbol name="clock" size={16} color={colors.textSecondary} />
          <Text style={styles.detailLabel}>Est. Completion:</Text>
          <Text style={styles.detailValue}>{formatDate(order.estimatedCompletion)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <IconSymbol name="location" size={16} color={colors.textSecondary} />
          <Text style={styles.detailLabel}>Branch:</Text>
          <Text style={styles.detailValue}>{order.branch}</Text>
        </View>
      </View>

      {order.status !== 'completed' && (
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Progress</Text>
          {renderProgressBar(order.progress)}
        </View>
      )}

      <View style={styles.statusSteps}>
        {getStatusSteps(order.status).map((step, index) => (
          <View key={step.key} style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              step.completed && styles.stepCircleCompleted,
            ]}>
              {step.completed && (
                <IconSymbol name="checkmark" size={12} color="white" />
              )}
            </View>
            <Text style={[
              styles.stepLabel,
              step.completed && styles.stepLabelCompleted,
            ]}>
              {step.label}
            </Text>
            {index < getStatusSteps(order.status).length - 1 && (
              <View style={[
                styles.stepLine,
                step.completed && styles.stepLineCompleted,
              ]} />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <IconSymbol name="bag.fill" size={32} color={colors.primary} />
          <Text style={commonStyles.title}>Order Tracking</Text>
          <Text style={commonStyles.textSecondary}>
            Track your glasses and contact lens orders
          </Text>
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="bag" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyDescription}>
              Your glasses and contact lens orders will appear here once you place them.
            </Text>
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {orders.map(renderOrderCard)}
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Need Help?</Text>
          <Text style={styles.infoText}>
            Contact your branch directly for any questions about your order:
          </Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Pretoria CBD:</Text>
              <Text style={styles.contactValue}>012 320 3802</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Sunnyside:</Text>
              <Text style={styles.contactValue}>012 582 3698</Text>
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  ordersContainer: {
    gap: 16,
  },
  orderCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  orderHeader: {
    marginBottom: 16,
  },
  orderTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  orderTitleInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  orderDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    minWidth: 100,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    minWidth: 40,
  },
  statusSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCircleCompleted: {
    backgroundColor: colors.primary,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  stepLabelCompleted: {
    color: colors.primary,
    fontWeight: '600',
  },
  stepLine: {
    position: 'absolute',
    top: 12,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: colors.secondary,
    zIndex: -1,
  },
  stepLineCompleted: {
    backgroundColor: colors.primary,
  },
  infoSection: {
    marginTop: 32,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  contactInfo: {
    gap: 8,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
