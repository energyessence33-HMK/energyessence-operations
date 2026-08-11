import { Text, View } from "react-native";

import {
  CREDENTIAL_REMEDIATION_PLAN,
  remediationStateLabel,
} from "@/lib/gateway/credential-remediation";

export function CredentialContainmentBoard() {
  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-lg font-bold text-foreground">Credential Containment</Text>
        <Text className="text-sm text-muted">
          The app records remediation readiness, not provider secrets. Rotation remains a human-approved L4 operation.
        </Text>
      </View>

      <View className="bg-surface rounded-lg p-4 border border-warning gap-2">
        <Text className="text-xs font-semibold text-warning uppercase tracking-wider">EA-001 boundary</Text>
        <Text className="text-xs text-muted leading-5">
          Do not paste credentials into chat, app fields, source control, client settings, or screenshots. Provider-side rotation and revocation must be explicitly approved and completed in the provider dashboard.
        </Text>
      </View>

      {CREDENTIAL_REMEDIATION_PLAN.map((plan) => (
        <View key={plan.id} className="bg-surface rounded-lg p-4 border border-border gap-3">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 gap-1">
              <Text className="text-sm font-semibold text-foreground">{plan.provider}</Text>
              <Text className="text-xs text-muted">{plan.evidenceClass} · {plan.riskLevel}</Text>
            </View>
            <View className="rounded-full px-2 py-1 bg-warning">
              <Text className="text-[10px] font-bold text-background">{remediationStateLabel(plan.state)}</Text>
            </View>
          </View>
          <View className="gap-1">
            <Text className="text-xs font-semibold text-foreground">Owner action</Text>
            <Text className="text-xs text-muted leading-5">{plan.ownerAction}</Text>
          </View>
          <View className="gap-1">
            <Text className="text-xs font-semibold text-foreground">Application boundary</Text>
            <Text className="text-xs text-muted leading-5">{plan.applicationAction}</Text>
          </View>
          <View className="gap-1">
            <Text className="text-xs font-semibold text-foreground">Verification</Text>
            <Text className="text-xs text-muted leading-5">{plan.verification}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
