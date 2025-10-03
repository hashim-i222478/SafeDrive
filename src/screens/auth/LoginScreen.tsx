import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme';
import { Button, Input, LoadingSpinner } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

interface LoginScreenProps {
  navigation?: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { signIn, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await signIn(formData.email.trim(), formData.password);
    } catch (error) {
      // Error is handled in the AuthContext
      console.error('Login error:', error);
    }
  };

  const handleForgotPassword = () => {
    if (navigation?.navigate) {
      navigation.navigate('ForgotPassword');
    } else {
      Alert.alert('Coming Soon', 'Forgot password feature will be available soon.');
    }
  };

  const handleSignUp = () => {
    if (navigation?.navigate) {
      navigation.navigate('SignUp');
    } else {
      Alert.alert('Coming Soon', 'Sign up feature will be available soon.');
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading) {
    return <LoadingSpinner overlay text="Signing you in..." />;
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
            <View style={[styles.logoContainer, { backgroundColor: theme.colors.primary[500] }]}>
              <Icon name="remove-red-eye" size={40} color={theme.colors.text.inverse} />
            </View>
            <Text style={[styles.title, theme.typography.heading.h1, { color: theme.colors.text.primary }]}>
              SafeDrive
            </Text>
            <Text style={[styles.subtitle, theme.typography.body.large, { color: theme.colors.text.secondary }]}>
              AI-Powered Drowsiness Detection
            </Text>
          </View>

          {/* Login Form */}
          <View style={[styles.formContainer, { backgroundColor: theme.colors.background.primary }, theme.shadows.lg]}>
            <Text style={[styles.formTitle, theme.typography.heading.h2, { color: theme.colors.text.primary }]}>
              Welcome Back
            </Text>
            <Text style={[styles.formSubtitle, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
              Sign in to continue monitoring your driving safety
            </Text>

            <View style={styles.form}>
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
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                error={errors.password}
                leftIcon="lock"
                rightIcon={showPassword ? 'visibility-off' : 'visibility'}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                autoComplete="password"
                required
                containerStyle={{ marginTop: theme.spacing[4] }}
              />

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={[theme.typography.body.small, { color: theme.colors.primary[500] }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                fullWidth
                style={{ marginTop: theme.spacing[6] }}
              />
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={[theme.typography.body.medium, { color: theme.colors.primary[500], fontWeight: '600' }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <Icon name="security" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.featureText, theme.typography.caption.large, { color: theme.colors.text.secondary }]}>
                Secure Authentication
              </Text>
            </View>
            <View style={styles.feature}>
              <Icon name="cloud-sync" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.featureText, theme.typography.caption.large, { color: theme.colors.text.secondary }]}>
                Cloud Sync
              </Text>
            </View>
            <View style={styles.feature}>
              <Icon name="analytics" size={24} color={theme.colors.primary[500]} />
              <Text style={[styles.featureText, theme.typography.caption.large, { color: theme.colors.text.secondary }]}>
                Driving Analytics
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
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  formTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    marginTop: 8,
    textAlign: 'center',
  },
});
