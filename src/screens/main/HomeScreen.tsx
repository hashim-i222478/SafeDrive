import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme';
import { Button } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { user, userProfile, signOut } = useAuth();

  const handleStartMonitoring = () => {
    // TODO: Implement drowsiness monitoring
    console.log('Start monitoring');
  };

  const handleViewHistory = () => {
    // TODO: Navigate to history screen
    console.log('View history');
  };

  const handleSettings = () => {
    // TODO: Navigate to settings screen
    console.log('Settings');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <LinearGradient
        colors={[theme.colors.primary[50], theme.colors.background.primary]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.greeting, theme.typography.body.large, { color: theme.colors.text.secondary }]}>
                Welcome back,
              </Text>
              <Text style={[styles.userName, theme.typography.heading.h2, { color: theme.colors.text.primary }]}>
                {userProfile?.firstName || user?.displayName || 'Driver'}
              </Text>
            </View>
            
            <TouchableOpacity
              style={[styles.profileButton, { backgroundColor: theme.colors.primary[500] }]}
              onPress={handleSettings}
            >
              <Icon name="person" size={24} color={theme.colors.text.inverse} />
            </TouchableOpacity>
          </View>

          {/* Status Card */}
          <View style={[styles.statusCard, { backgroundColor: theme.colors.background.primary }, theme.shadows.md]}>
            <View style={styles.statusHeader}>
              <View style={[styles.statusIcon, { backgroundColor: theme.colors.success[100] }]}>
                <Icon name="remove-red-eye" size={32} color={theme.colors.success[500]} />
              </View>
              <View style={styles.statusInfo}>
                <Text style={[styles.statusTitle, theme.typography.heading.h3, { color: theme.colors.text.primary }]}>
                  Ready to Drive
                </Text>
                <Text style={[styles.statusSubtitle, theme.typography.body.medium, { color: theme.colors.text.secondary }]}>
                  AI monitoring system is active
                </Text>
              </View>
            </View>
            
            <Button
              title="Start Monitoring"
              onPress={handleStartMonitoring}
              fullWidth
              icon={<Icon name="play-arrow" size={20} color={theme.colors.text.inverse} />}
              style={{ marginTop: theme.spacing[4] }}
            />
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <Text style={[styles.sectionTitle, theme.typography.heading.h4, { color: theme.colors.text.primary }]}>
              Your Driving Stats
            </Text>
            
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: theme.colors.background.primary }, theme.shadows.sm]}>
                <Icon name="directions-car" size={24} color={theme.colors.primary[500]} />
                <Text style={[styles.statValue, theme.typography.heading.h3, { color: theme.colors.text.primary }]}>
                  {userProfile?.drivingHistory?.totalTrips || 0}
                </Text>
                <Text style={[styles.statLabel, theme.typography.caption.large, { color: theme.colors.text.secondary }]}>
                  Total Trips
                </Text>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: theme.colors.background.primary }, theme.shadows.sm]}>
                <Icon name="access-time" size={24} color={theme.colors.secondary[500]} />
                <Text style={[styles.statValue, theme.typography.heading.h3, { color: theme.colors.text.primary }]}>
                  {Math.floor((userProfile?.drivingHistory?.totalDrivingTime || 0) / 60)}h
                </Text>
                <Text style={[styles.statLabel, theme.typography.caption.large, { color: theme.colors.text.secondary }]}>
                  Driving Time
                </Text>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: theme.colors.background.primary }, theme.shadows.sm]}>
                <Icon name="warning" size={24} color={theme.colors.warning[500]} />
                <Text style={[styles.statValue, theme.typography.heading.h3, { color: theme.colors.text.primary }]}>
                  {userProfile?.drivingHistory?.drowsinessIncidents || 0}
                </Text>
                <Text style={[styles.statLabel, theme.typography.caption.large, { color: theme.colors.text.secondary }]}>
                  Alerts
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <Text style={[styles.sectionTitle, theme.typography.heading.h4, { color: theme.colors.text.primary }]}>
              Quick Actions
            </Text>
            
            <View style={styles.actionsGrid}>
              <TouchableOpacity
                style={[styles.actionCard, { backgroundColor: theme.colors.background.primary }, theme.shadows.sm]}
                onPress={handleViewHistory}
              >
                <Icon name="history" size={32} color={theme.colors.primary[500]} />
                <Text style={[styles.actionTitle, theme.typography.label.medium, { color: theme.colors.text.primary }]}>
                  View History
                </Text>
                <Text style={[styles.actionSubtitle, theme.typography.caption.medium, { color: theme.colors.text.secondary }]}>
                  Check past trips
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionCard, { backgroundColor: theme.colors.background.primary }, theme.shadows.sm]}
                onPress={handleSettings}
              >
                <Icon name="settings" size={32} color={theme.colors.secondary[500]} />
                <Text style={[styles.actionTitle, theme.typography.label.medium, { color: theme.colors.text.primary }]}>
                  Settings
                </Text>
                <Text style={[styles.actionSubtitle, theme.typography.caption.medium, { color: theme.colors.text.secondary }]}>
                  Customize alerts
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Out Button */}
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            fullWidth
            style={{ marginTop: theme.spacing[8] }}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    marginBottom: 4,
  },
  userName: {
    fontWeight: '600',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    marginBottom: 4,
  },
  statusSubtitle: {},
  statsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionTitle: {
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    textAlign: 'center',
  },
});
