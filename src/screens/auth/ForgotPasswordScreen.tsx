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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme';
import { Button, Input } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    try {
      setLoading(true);
      await resetPassword(email.trim());
      setEmailSent(true);
    } catch (error) {
      // Error is handled in the AuthContext
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    handleResetPassword();
  };

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
              <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
            
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.secondary[500] }]}>
              <Icon name="lock-reset" size={32} color={theme.colors.text.inverse} />
            </View>
            <Text style={[styles.title, theme.typography.heading.h2, { color: theme.colors.text.primary }]}>
              Reset Password
            </Text>
            <Text style={[styles.subtitle, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
              {emailSent 
                ? 'Check your email for reset instructions'
                : 'Enter your email to receive reset instructions'
              }
            </Text>
          </View>

          {/* Content */}
          <View style={[styles.contentContainer, { backgroundColor: theme.colors.background.primary }, theme.shadows.lg]}>
            {!emailSent ? (
              <>
                <View style={styles.form}>
                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(value) => {
                      setEmail(value);
                      if (error) setError('');
                    }}
                    error={error}
                    leftIcon="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    required
                  />

                  <Button
                    title="Send Reset Email"
                    onPress={handleResetPassword}
                    loading={loading}
                    fullWidth
                    style={{ marginTop: theme.spacing[6] }}
                  />
                </View>

                <View style={styles.helpText}>
                  <Icon name="info" size={16} color={theme.colors.primary[500]} />
                  <Text style={[styles.helpTextContent, theme.typography.caption.large, { color: theme.colors.text.secondary }]}>
                    We'll send you a secure link to reset your password
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.successContainer}>
                  <View style={[styles.successIcon, { backgroundColor: theme.colors.success[100] }]}>
                    <Icon name="check-circle" size={48} color={theme.colors.success[500]} />
                  </View>
                  
                  <Text style={[styles.successTitle, theme.typography.heading.h3, { color: theme.colors.text.primary }]}>
                    Email Sent!
                  </Text>
                  
                  <Text style={[styles.successMessage, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
                    We've sent a password reset link to:
                  </Text>
                  
                  <Text style={[styles.emailText, theme.typography.body.medium, { color: theme.colors.primary[500] }]}>
                    {email}
                  </Text>
                  
                  <Text style={[styles.instructionText, theme.typography.body.small, { color: theme.colors.text.secondary }]}>
                    Please check your email and click the link to reset your password. 
                    The link will expire in 1 hour for security reasons.
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  <Button
                    title="Back to Login"
                    onPress={handleBackToLogin}
                    variant="primary"
                    fullWidth
                  />
                  
                  <Button
                    title="Resend Email"
                    onPress={handleResendEmail}
                    variant="ghost"
                    fullWidth
                    style={{ marginTop: theme.spacing[3] }}
                  />
                </View>
              </>
            )}
          </View>

          {/* Additional Help */}
          <View style={styles.additionalHelp}>
            <Text style={[theme.typography.caption.medium, { color: theme.colors.text.secondary, textAlign: 'center' }]}>
              Still having trouble? Contact our support team
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={[theme.typography.caption.medium, { color: theme.colors.primary[500], textAlign: 'center' }]}>
                Get Help
              </Text>
            </TouchableOpacity>
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
  iconContainer: {
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
    paddingHorizontal: 20,
  },
  contentContainer: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  helpText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
  },
  helpTextContent: {
    marginLeft: 8,
    flex: 1,
  },
  successContainer: {
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  successMessage: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16,
  },
  instructionText: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionButtons: {
    width: '100%',
  },
  additionalHelp: {
    alignItems: 'center',
  },
  supportButton: {
    marginTop: 8,
    padding: 8,
  },
});
