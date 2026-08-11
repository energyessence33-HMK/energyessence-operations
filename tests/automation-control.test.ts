import { describe, expect, it } from "vitest";

import {
  EXECUTIVE_AUTOMATION_CONTROLS,
  canRunAutonomously,
  controlStateLabel,
} from "../lib/gateway/automation-control";

describe("executive automation controls", () => {
  it("permits autonomous operation only for ready non-external L0–L2 controls", () => {
    const evidenceReview = EXECUTIVE_AUTOMATION_CONTROLS.find((control) => control.id === "connector-evidence-review");
    const productReview = EXECUTIVE_AUTOMATION_CONTROLS.find((control) => control.id === "shopify-digital-product-review");

    expect(evidenceReview).toBeDefined();
    expect(productReview).toBeDefined();
    expect(canRunAutonomously(evidenceReview!)).toBe(true);
    expect(canRunAutonomously(productReview!)).toBe(false);
  });

  it("requires human approval for consequential controls and exposes blocked states clearly", () => {
    const credentialRemediation = EXECUTIVE_AUTOMATION_CONTROLS.find(
      (control) => control.id === "provider-credential-remediation",
    );

    expect(credentialRemediation).toBeDefined();
    expect(controlStateLabel(credentialRemediation!)).toBe("BLOCKED");
    expect(EXECUTIVE_AUTOMATION_CONTROLS.every((control) => control.preconditions.length > 0)).toBe(true);
  });
});
