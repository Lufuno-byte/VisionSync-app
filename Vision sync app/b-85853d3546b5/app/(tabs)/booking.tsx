
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const branches: Branch[] = [
  {
    id: 'pretoria',
    name: 'Pretoria CBD',
    address: 'Shop 12A, Bothongo plaza west, Francis Baard street',
    phone: '012 320 3802',
  },
  {
    id: 'sunnyside',
    name: 'Sunnyside',
    address: '77 Robert sobukwe street (formerly esellen str)',
    phone: '012 582 3698',
  },
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

export default function BookingScreen() {
  const { user } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleBooking = async () => {
    if (!selectedBranch || !selectedTime) {
      Alert.alert('Incomplete Booking', 'Please select a branch and time slot.');
      return;
    }

    const bookingDetails = `
Eye Test Booking Request

Patient Information:
- Name: ${user?.firstName} ${user?.lastName}
- Email: ${user?.email}
- Phone: ${user?.phone || 'Not provided'}

Booking Details:
- Branch: ${selectedBranch.name}
- Address: ${selectedBranch.address}
- Date: ${formatDate(selectedDate)}
- Time: ${selectedTime}

Please confirm this appointment.

Thank you,
${user?.firstName} ${user?.lastName}
    `.trim();

    const subject = `Eye Test Booking Request - ${selectedBranch.name}`;
    const emailUrl = `mailto:info@bolokaoptometrists.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bookingDetails)}`;

    try {
      const canOpen = await Linking.canOpenURL(emailUrl);
      if (canOpen) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert(
          'Email Not Available',
          'Please send your booking request to info@bolokaoptometrists.co.za with the following details:\n\n' + bookingDetails
        );
      }
    } catch (error) {
      console.log('Error opening email:', error);
      Alert.alert(
        'Email Error',
        'Please send your booking request to info@bolokaoptometrists.co.za'
      );
    }
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <IconSymbol name="calendar" size={32} color={colors.primary} />
          <Text style={commonStyles.title}>Book Eye Test</Text>
          <Text style={commonStyles.textSecondary}>
            Schedule your appointment at one of our branches
          </Text>
        </View>

        {/* Branch Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Branch</Text>
          {branches.map((branch) => (
            <TouchableOpacity
              key={branch.id}
              style={[
                styles.branchCard,
                selectedBranch?.id === branch.id && styles.selectedBranchCard,
              ]}
              onPress={() => setSelectedBranch(branch)}
            >
              <View style={styles.branchHeader}>
                <View style={styles.branchInfo}>
                  <Text style={[
                    styles.branchName,
                    selectedBranch?.id === branch.id && styles.selectedText,
                  ]}>
                    {branch.name}
                  </Text>
                  <Text style={[
                    styles.branchAddress,
                    selectedBranch?.id === branch.id && styles.selectedTextSecondary,
                  ]}>
                    {branch.address}
                  </Text>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedBranch?.id === branch.id && styles.radioButtonSelected,
                ]}>
                  {selectedBranch?.id === branch.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
              <View style={styles.branchContact}>
                <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
                <Text style={[
                  styles.branchPhone,
                  selectedBranch?.id === branch.id && styles.selectedTextSecondary,
                ]}>
                  {branch.phone}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <IconSymbol name="calendar" size={20} color={colors.primary} />
            <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
            <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          
          {isWeekend(selectedDate) && (
            <View style={styles.warningContainer}>
              <IconSymbol name="exclamationmark.triangle.fill" size={16} color={colors.error} />
              <Text style={styles.warningText}>
                Selected date is a weekend. Please choose a weekday.
              </Text>
            </View>
          )}
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.selectedTimeSlotText,
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Book Button */}
        <View style={styles.bookingSection}>
          <TouchableOpacity
            style={[
              buttonStyles.primary,
              styles.bookButton,
              (!selectedBranch || !selectedTime || isWeekend(selectedDate)) && styles.disabledButton,
            ]}
            onPress={handleBooking}
            disabled={!selectedBranch || !selectedTime || isWeekend(selectedDate)}
          >
            <IconSymbol name="envelope.fill" size={20} color="white" />
            <Text style={styles.bookButtonText}>Send Booking Request</Text>
          </TouchableOpacity>
          
          <Text style={styles.bookingNote}>
            This will open your email app to send a booking request to info@bolokaoptometrists.co.za
          </Text>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={getMinDate()}
          />
        )}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  branchCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  selectedBranchCard: {
    borderColor: colors.primary,
    backgroundColor: colors.highlight,
  },
  branchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  branchInfo: {
    flex: 1,
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
  },
  branchContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  branchPhone: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedText: {
    color: colors.primary,
  },
  selectedTextSecondary: {
    color: colors.primary,
    opacity: 0.8,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  dateButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.secondary,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: colors.error,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  selectedTimeSlotText: {
    color: 'white',
    fontWeight: '600',
  },
  bookingSection: {
    marginTop: 16,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  disabledButton: {
    backgroundColor: colors.textSecondary,
    opacity: 0.6,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bookingNote: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
});
