import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const workflowPath = resolve(process.cwd(), ".github/workflows/ci-cd-pipeline.yml");
const workflow = readFileSync(workflowPath, "utf8");

describe("CI/CD execution governance", () => {
  it("keeps quality checks aligned to existing package scripts", () => {
    expect(workflow).toContain("run: pnpm check");
    expect(workflow).not.toContain("run: pnpm type-check");
    expect(workflow).not.toContain("pnpm test:coverage");
  });

  it("requires named approval phrases before consequential external operations", () => {
    expect(workflow).toContain("inputs.approve_production == 'APPROVE_PRODUCTION'");
    expect(workflow).toContain("inputs.approve_notifications == 'APPROVE_NOTIFICATIONS'");
    expect(workflow).toContain("inputs.approve_notion_archive == 'APPROVE_NOTION_ARCHIVE'");
    expect(workflow).toContain("name: production");
  });

  it("does not auto-deploy production from ordinary pushes", () => {
    expect(workflow).not.toContain("github.ref == 'refs/heads/main' && github.event_name == 'push'");
  });
});
