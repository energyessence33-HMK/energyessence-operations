import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const authHook = readFileSync(resolve(process.cwd(), "hooks/use-auth.ts"), "utf8");

describe("authentication log hygiene", () => {
  it("does not log session fragments, cached user objects, or API user responses", () => {
    expect(authHook).not.toContain("Session token:");
    expect(authHook).not.toContain("Cached user:");
    expect(authHook).not.toContain("API user response:");
    expect(authHook).not.toContain("sessionToken.substring");
  });
});
