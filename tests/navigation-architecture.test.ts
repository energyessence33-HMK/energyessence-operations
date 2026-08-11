import { describe, expect, it } from "vitest";

import { TASK_FIRST_NAV_ITEMS } from "../lib/navigation/task-first-nav";

describe("task-first navigation", () => {
  it("limits the primary shell to five durable user jobs", () => {
    expect(TASK_FIRST_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Command",
      "Create",
      "Grow",
      "Commerce",
      "Operate",
    ]);
  });

  it("keeps operational routes reachable through progressive disclosure", () => {
    const operate = TASK_FIRST_NAV_ITEMS.find((item) => item.id === "operate");
    const routes = operate?.submenu?.map((item) => item.route);

    expect(routes).toEqual(expect.arrayContaining([
      "/(tabs)/ecosystems",
      "/(tabs)/workflow",
      "/(tabs)/scheduler",
      "/(tabs)/integrations",
    ]));
  });

  it("keeps Command as a dedicated root destination rather than a catch-all active state", () => {
    const command = TASK_FIRST_NAV_ITEMS.find((item) => item.id === "command");

    expect(command?.route).toBe("/(tabs)");
    expect(TASK_FIRST_NAV_ITEMS.filter((item) => item.route === "/(tabs)")).toHaveLength(1);
  });
});
