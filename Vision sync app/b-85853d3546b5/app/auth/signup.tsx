
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { signUp, error, isLoading, clearError } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      Alert.alert('Missing Information', 'Please enter your first name.');
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert('Missing Information', 'Please enter your last name.');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Missing Information', 'Please enter your email address.');
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    if (!formData.password) {
      Alert.alert('Missing Information', 'Please enter a password.');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    const success = await signUp({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
    });

    if (success) {
      Alert.alert(
        'Account Created!',
        'Your account has been created successfully. You are now signed in.',
        [{ text: 'Continue', onPress: () => router.replace('/(tabs)') }]
      );
    }
  };

  const renderInput = (
    field: keyof typeof formData,
    label: string,
    placeholder: string,
    options: {
      keyboardType?: 'default' | 'email-address' | 'phone-pad';
      secureTextEntry?: boolean;
      autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    } = {}
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          commonStyles.input,
          focusedField === field && commonStyles.inputFocused,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField(null)}
        keyboardType={options.keyboardType || 'default'}
        secureTextEntry={options.secureTextEntry || false}
        autoCapitalize={options.autoCapitalize || 'sentences'}
        autoCorrect={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={commonStyles.title}>Create Account</Text>
            <Text style={[commonStyles.textSecondary, styles.subtitle]}>
              Join Vision Sync to book your eye tests and track your orders
            </Text>
          </View>

          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <IconSymbol name="exclamationmark.triangle.fill" size={16} color={colors.error} />
                <Text style={commonStyles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.nameRow}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={[
                    commonStyles.input,
                    focusedField === 'firstName' && commonStyles.inputFocused,
                  ]}
                  placeholder="First name"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={[
                    commonStyles.input,
                    focusedField === 'lastName' && commonStyles.inputFocused,
                  ]}
                  placeholder="Last name"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {renderInput('email', 'Email', 'Enter your email', {
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            })}

            {renderInput('phone', 'Phone', 'Enter your phone number', {
              keyboardType: 'phone-pad',
            })}

            {renderInput('password', 'Password', 'Create a password', {
              secureTextEntry: true,
              autoCapitalize: 'none',
            })}

            {renderInput('confirmPassword', 'Confirm Password', 'Confirm your password', {
              secureTextEntry: true,
              autoCapitalize: 'none',
            })}

            <TouchableOpacity
              style={[buttonStyles.primary, styles.signUpButton]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <View style={styles.signInContainer}>
              <Text style={commonStyles.textSecondary}>Already have an account? </Text>
              <Link href="/auth/signin" asChild>
                <TouchableOpacity>
                  <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  signUpButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
