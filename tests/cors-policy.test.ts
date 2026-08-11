import { describe, expect, it } from "vitest";

import { isAllowedWebOrigin } from "../server/security/cors-policy";

describe("credentialed CORS policy", () => {
  it("allows a configured production origin", () => {
    expect(
      isAllowedWebOrigin(
        "https://energyessence2.store",
        "3000-example.us1.manus.computer",
        "https://energyessence2.store,https://kingdomapp-aat6u9kd.manus.space",
      ),
    ).toBe(true);
  });

  it("allows only the paired Metro preview host by default", () => {
    expect(
      isAllowedWebOrigin(
        "https://8081-example.us1.manus.computer",
        "3000-example.us1.manus.computer",
      ),
    ).toBe(true);
    expect(
      isAllowedWebOrigin(
        "https://8081-other.us1.manus.computer",
        "3000-example.us1.manus.computer",
      ),
    ).toBe(false);
  });

  it("rejects arbitrary origins when credentials are in use", () => {
    expect(
      isAllowedWebOrigin(
        "https://untrusted.example",
        "3000-example.us1.manus.computer",
        "https://energyessence2.store",
      ),
    ).toBe(false);
  });
});
