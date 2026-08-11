import { describe, expect, it } from "vitest";

import {
  CREDENTIAL_REMEDIATION_PLAN,
  credentialRotationPreflight,
  remediationStateLabel,
} from "../lib/gateway/credential-remediation";

describe("credential remediation model", () => {
  it("contains provider remediation steps without storing secret-like fields or values", () => {
    const serialized = JSON.stringify(CREDENTIAL_REMEDIATION_PLAN).toLowerCase();

    expect(CREDENTIAL_REMEDIATION_PLAN).toHaveLength(2);
    expect(serialized).not.toContain("api_key");
    expect(serialized).not.toContain("client_secret");
    expect(serialized).not.toContain("access_token");
  });

  it("produces an L4, non-reversible rotation-readiness preflight", () => {
    const preflight = credentialRotationPreflight(CREDENTIAL_REMEDIATION_PLAN[0]);

    expect(preflight.riskLevel).toBe("L4");
    expect(preflight.action).toBe("credential_rotation_readiness");
    expect(preflight.rollbackReference).toContain("non-reversible");
    expect(remediationStateLabel("containment_required")).toBe("CONTAINMENT REQUIRED");
  });
});
