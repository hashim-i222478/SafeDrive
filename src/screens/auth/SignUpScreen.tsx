import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme';
import { Button, Input, LoadingSpinner } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { UserProfile } from '../../config/firebase';

interface SignUpScreenProps {
  navigation: any;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { signUp, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance
    if (!acceptedTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const additionalData: Partial<UserProfile> = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        displayName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      };

      await signUp(formData.email.trim(), formData.password, additionalData);
    } catch (error) {
      // Error is handled in the AuthContext
      console.error('Sign up error:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return <LoadingSpinner overlay text="Creating your account..." />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[theme.colors.primary[50], theme.colors.background.primary]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.backIcon, { color: theme.colors.text.primary }]}>←</Text>
            </TouchableOpacity>
            
            <View style={[styles.logoContainer, { backgroundColor: theme.colors.primary[500] }]}>
              <Text style={[styles.logoIcon, { color: theme.colors.text.inverse }]}>👁</Text>
            </View>
            <Text style={[styles.title, theme.typography.heading.h2, { color: theme.colors.text.primary }]}>
              Join SafeDrive
            </Text>
            <Text style={[styles.subtitle, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
              Create your account to start safe driving
            </Text>
          </View>

          {/* Sign Up Form */}
          <View style={[styles.formContainer, { backgroundColor: theme.colors.background.primary }, theme.shadows.lg]}>
            <View style={styles.form}>
              <View style={styles.nameRow}>
                <Input
                  label="First Name"
                  placeholder="First name"
                  value={formData.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                  error={errors.firstName}
                  leftIcon="person"
                  autoCapitalize="words"
                  required
                  containerStyle={styles.nameInput}
                />
                <Input
                  label="Last Name"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChangeText={(value) => updateField('lastName', value)}
                  error={errors.lastName}
                  leftIcon="person"
                  autoCapitalize="words"
                  required
                  containerStyle={styles.nameInput}
                />
              </View>

              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                error={errors.email}
                leftIcon="email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                required
                containerStyle={{ marginTop: theme.spacing[4] }}
              />

              <Input
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                error={errors.password}
                helperText="Must contain uppercase, lowercase, and number"
                leftIcon="lock"
                rightIcon={showPassword ? 'visibility-off' : 'visibility'}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
                required
                containerStyle={{ marginTop: theme.spacing[4] }}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value) => updateField('confirmPassword', value)}
                error={errors.confirmPassword}
                leftIcon="lock"
                rightIcon={showConfirmPassword ? 'visibility-off' : 'visibility'}
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                required
                containerStyle={{ marginTop: theme.spacing[4] }}
              />

              {/* Terms and Conditions */}
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              >
                <View style={[
                  styles.checkbox,
                  { borderColor: theme.colors.border.medium },
                  acceptedTerms && { backgroundColor: theme.colors.primary[500] }
                ]}>
                  {acceptedTerms && (
                    <Text style={[styles.checkIcon, { color: theme.colors.text.inverse }]}>✓</Text>
                  )}
                </View>
                <Text style={[styles.termsText, theme.typography.body.small, { color: theme.colors.text.secondary }]}>
                  I agree to the{' '}
                  <Text style={{ color: theme.colors.primary[500] }}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={{ color: theme.colors.primary[500] }}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {errors.terms && (
                <Text style={[styles.errorText, { color: theme.colors.error[500] }]}>
                  {errors.terms}
                </Text>
              )}

              <Button
                title="Create Account"
                onPress={handleSignUp}
                loading={loading}
                fullWidth
                style={{ marginTop: theme.spacing[6] }}
              />
            </View>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={[theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={[theme.typography.body.medium, { color: theme.colors.primary[500], fontWeight: '600' }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Security Features */}
          <View style={styles.securityFeatures}>
            <View style={styles.securityFeature}>
              <Text style={[styles.securityIcon, { color: theme.colors.success[500] }]}>🔒</Text>
              <Text style={[styles.securityText, theme.typography.caption.medium, { color: theme.colors.text.secondary }]}>
                256-bit SSL Encryption
              </Text>
            </View>
            <View style={styles.securityFeature}>
              <Text style={[styles.securityIcon, { color: theme.colors.success[500] }]}>✅</Text>
              <Text style={[styles.securityText, theme.typography.caption.medium, { color: theme.colors.text.secondary }]}>
                Secure Data Storage
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  securityFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  securityText: {
    marginLeft: 8,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoIcon: {
    fontSize: 32,
    textAlign: 'center',
  },
  checkIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  securityIcon: {
    fontSize: 20,
    textAlign: 'center',
  },
});
