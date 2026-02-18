import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";
import { SubscriptionService, SubscriptionTier } from "@/lib/services/subscription-service";
import { useState } from "react";

export default function SubscriptionScreen() {
  const colors = useColors();
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = SubscriptionService.getAllPlans();

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-6 py-8">
          {/* Header */}
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: colors.foreground }}
          >
            Choose Your Plan
          </Text>
          <Text
            className="text-base mb-8"
            style={{ color: colors.muted }}
          >
            Unlock premium features and scale your empire
          </Text>

          {/* Billing Toggle */}
          <View className="flex-row gap-4 mb-8 p-1 rounded-xl" style={{ backgroundColor: colors.surface }}>
            <TouchableOpacity
              onPress={() => setBillingCycle("monthly")}
              className={`flex-1 py-3 rounded-lg items-center ${
                billingCycle === "monthly" ? "bg-primary" : ""
              }`}
            >
              <Text
                className="font-semibold"
                style={{
                  color: billingCycle === "monthly" ? "white" : colors.foreground,
                }}
              >
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBillingCycle("annual")}
              className={`flex-1 py-3 rounded-lg items-center ${
                billingCycle === "annual" ? "bg-primary" : ""
              }`}
            >
              <Text
                className="font-semibold"
                style={{
                  color: billingCycle === "annual" ? "white" : colors.foreground,
                }}
              >
                Annual (Save 20%)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Plans */}
          <View className="gap-6">
            {plans.map((plan) => {
              const isSelected = selectedTier === plan.tier;
              const price =
                billingCycle === "annual"
                  ? SubscriptionService.getAnnualPrice(plan.tier)
                  : plan.price;

              return (
                <TouchableOpacity
                  key={plan.tier}
                  onPress={() => setSelectedTier(plan.tier)}
                  className={`p-6 rounded-2xl border-2 ${
                    isSelected ? "border-primary" : "border-border"
                  }`}
                  style={{
                    backgroundColor: isSelected ? colors.surface : colors.surface + "80",
                  }}
                >
                  {/* Plan Header */}
                  <View className="flex-row items-start justify-between mb-4">
                    <View>
                      <Text
                        className="text-2xl font-bold mb-1"
                        style={{ color: colors.foreground }}
                      >
                        {plan.name}
                      </Text>
                      <Text
                        className="text-sm"
                        style={{ color: colors.muted }}
                      >
                        {plan.description}
                      </Text>
                    </View>
                    {isSelected && (
                      <MaterialIcons name="check-circle" size={28} color={colors.primary} />
                    )}
                  </View>

                  {/* Price */}
                  <View className="mb-6">
                    {plan.tier === "free" ? (
                      <Text
                        className="text-3xl font-bold"
                        style={{ color: colors.primary }}
                      >
                        Free
                      </Text>
                    ) : (
                      <View className="flex-row items-baseline gap-2">
                        <Text
                          className="text-4xl font-bold"
                          style={{ color: colors.primary }}
                        >
                          ${price.toFixed(2)}
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: colors.muted }}
                        >
                          /{billingCycle === "annual" ? "year" : "month"}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Features */}
                  <View className="gap-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <View key={idx} className="flex-row items-center gap-3">
                        <MaterialIcons name="check" size={20} color={colors.primary} />
                        <Text
                          className="text-sm"
                          style={{ color: colors.foreground }}
                        >
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* CTA Button */}
                  <TouchableOpacity
                    className={`w-full py-4 rounded-xl items-center ${
                      isSelected
                        ? "bg-primary"
                        : "border-2"
                    }`}
                    style={
                      !isSelected
                        ? { borderColor: colors.primary }
                        : {}
                    }
                  >
                    <Text
                      className="font-bold text-lg"
                      style={{
                        color: isSelected ? "white" : colors.primary,
                      }}
                    >
                      {plan.tier === "free" ? "Current Plan" : "Upgrade Now"}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* FAQ */}
          <View className="mt-12 pt-8 border-t" style={{ borderColor: colors.border }}>
            <Text
              className="text-xl font-bold mb-4"
              style={{ color: colors.foreground }}
            >
              Frequently Asked Questions
            </Text>

            <View className="gap-4">
              <View>
                <Text
                  className="font-semibold mb-2"
                  style={{ color: colors.foreground }}
                >
                  Can I change my plan anytime?
                </Text>
                <Text
                  className="text-sm"
                  style={{ color: colors.muted }}
                >
                  Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately.
                </Text>
              </View>

              <View>
                <Text
                  className="font-semibold mb-2"
                  style={{ color: colors.foreground }}
                >
                  What payment methods do you accept?
                </Text>
                <Text
                  className="text-sm"
                  style={{ color: colors.muted }}
                >
                  We accept all major credit cards, PayPal, and Apple Pay.
                </Text>
              </View>

              <View>
                <Text
                  className="font-semibold mb-2"
                  style={{ color: colors.foreground }}
                >
                  Is there a free trial?
                </Text>
                <Text
                  className="text-sm"
                  style={{ color: colors.muted }}
                >
                  Yes! Start with our free plan and upgrade anytime.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
