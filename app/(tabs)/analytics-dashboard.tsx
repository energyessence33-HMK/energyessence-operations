import { ScrollView, View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { AnalyticsDashboardService, type AnalyticsDashboardMetrics } from '@/lib/services/analytics-dashboard-service';
import { useEffect, useState } from 'react';
import { useColors } from '@/hooks/use-colors';
// import { Dimensions } from 'react-native'; // Screen dimensions

/**
 * Real-time Analytics Dashboard
 * Admin panel for monitoring user engagement and subscription metrics
 */

interface MetricCard {
  label: string;
  value: string | number;
  change?: string;
  color: string;
}

export default function AnalyticsDashboard() {
  const colors = useColors();
  const [metrics, setMetrics] = useState<AnalyticsDashboardMetrics | null>(null);

  useEffect(() => {
    loadMetrics();
    // Refresh metrics every 30 seconds for real-time updates
    const interval = setInterval(loadMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await AnalyticsDashboardService.getDashboardMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Error loading analytics metrics:', error);
    }
  };

  if (!metrics) {
    return (
      <ScreenContainer className="p-6">
        <Text className="text-center text-muted">Loading analytics...</Text>
      </ScreenContainer>
    );
  }

  const overviewCards: MetricCard[] = [
    {
      label: 'Total Users',
      value: metrics.overview.totalUsers.toLocaleString(),
      change: '+12%',
      color: '#0a7ea4',
    },
    {
      label: 'Active Users',
      value: metrics.overview.activeUsers.toLocaleString(),
      change: '+8%',
      color: '#4ADE80',
    },
    {
      label: 'Total Revenue',
      value: `$${(metrics.overview.totalRevenue / 1000).toFixed(1)}k`,
      change: '+25%',
      color: '#FBBF24',
    },
    {
      label: 'Subscriptions',
      value: metrics.overview.totalSubscriptions.toLocaleString(),
      change: '+5%',
      color: '#F87171',
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-foreground">Analytics Dashboard</Text>
          <Text className="text-base text-muted mt-2">Real-time engagement and subscription metrics</Text>
        </View>

        {/* Overview Cards */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-foreground mb-4">Overview</Text>
          <View className="gap-4">
            {overviewCards.map((card, index) => (
              <View
                key={index}
                className="bg-surface rounded-xl p-4 border border-border"
                style={{ borderLeftColor: card.color, borderLeftWidth: 4 }}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-sm text-muted mb-1">{card.label}</Text>
                    <Text className="text-2xl font-bold text-foreground">{card.value}</Text>
                  </View>
                  {card.change && (
                    <View className="bg-green-100 px-3 py-1 rounded-full">
                      <Text className="text-sm font-semibold text-green-700">{card.change}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Engagement Metrics */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-foreground mb-4">Engagement</Text>
          <View className="gap-4">
            <MetricRow
              label="Videos Created"
              value={metrics.engagement.videosCreated.toLocaleString()}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Videos Watched"
              value={metrics.engagement.videosWatched.toLocaleString()}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Avg Session Duration"
              value={`${Math.floor(metrics.engagement.averageSessionDuration / 60)}m`}
              bgColor={colors.primary}
            />
            <MetricRow
              label="User Retention Rate"
              value={`${metrics.engagement.userRetentionRate}%`}
              bgColor={colors.primary}
            />
          </View>
        </View>

        {/* Subscription Metrics */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-foreground mb-4">Subscriptions</Text>
          <View className="gap-4">
            <MetricRow
              label="Active Subscriptions"
              value={metrics.subscriptions.activeSubscriptions.toLocaleString()}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Monthly Recurring Revenue"
              value={`$${(metrics.subscriptions.monthlyRecurringRevenue / 1000).toFixed(1)}k`}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Churn Rate"
              value={`${metrics.subscriptions.churnRate}%`}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Conversion Rate"
              value={`${metrics.subscriptions.conversionRate}%`}
              bgColor={colors.primary}
            />
          </View>
        </View>

        {/* Spiritual Metrics */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-foreground mb-4">Spiritual Alignment</Text>
          <View className="gap-4">
            <MetricRow
              label="Users with Identity"
              value={metrics.spiritualMetrics.usersWithIdentity.toLocaleString()}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Users with Brand"
              value={metrics.spiritualMetrics.usersWithBrand.toLocaleString()}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Daily Affirmations"
              value={metrics.spiritualMetrics.averageAffirmationsPerDay.toLocaleString()}
              bgColor={colors.primary}
            />
            <MetricRow
              label="Community Engagement"
              value={metrics.spiritualMetrics.communityEngagement.toLocaleString()}
              bgColor={colors.primary}
            />
          </View>
        </View>

        {/* Trends Section */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-foreground mb-4">30-Day Trends</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-sm text-muted mb-4">Daily Active Users</Text>
            <View className="h-32 bg-background rounded-lg flex-row items-end gap-1 p-2">
              {metrics.trends.dailyActiveUsers.slice(-7).map((item, index) => (
                <View
                  key={index}
                  className="flex-1 bg-primary rounded-t"
                  style={{
                    height: `${(item.count / 1000) * 100}%`,
                    minHeight: 10,
                  }}
                />
              ))}
            </View>
            <Text className="text-xs text-muted mt-2 text-center">Last 7 days</Text>
          </View>
        </View>

        {/* Last Updated */}
        <View className="py-4 border-t border-border">
          <Text className="text-xs text-muted text-center">
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

/**
 * Metric Row Component
 */
function MetricRow({
  label,
  value,
  bgColor,
}: {
  label: string;
  value: string | number;
  bgColor: string;
}) {
  return (
    <View className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
      <Text className="text-sm text-muted">{label}</Text>
      <View className="flex-row items-center gap-3">
        <Text className="text-lg font-bold text-foreground">{value}</Text>
        <View
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: bgColor }}
        />
      </View>
    </View>
  );
}
