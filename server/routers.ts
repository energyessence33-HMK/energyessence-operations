import { COOKIE_NAME } from "../shared/const.js";
import { GOVERNED_INTEGRATIONS } from "../lib/gateway/integration-registry";
import { governancePreflight } from "../lib/gateway/governance-preflight";
import { PERMISSION_LEVELS } from "../lib/gateway/execution-models";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  workflows: router({
    list: protectedProcedure.query(({ ctx }) => db.listWorkflowsForUser(ctx.user.id)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().trim().min(1).max(255),
          description: z.string().trim().max(5000).nullable().optional(),
          priority: z.enum(["low", "medium", "high"]).default("medium"),
          dueDate: z.coerce.date().nullable().optional(),
        }),
      )
      .mutation(({ ctx, input }) => db.createWorkflowForUser(ctx.user.id, input)),
  }),

  scheduledPosts: router({
    list: protectedProcedure.query(({ ctx }) => db.listScheduledPostsForUser(ctx.user.id)),
  }),

  ecosystems: router({
    list: protectedProcedure.query(({ ctx }) => db.listEcosystemsForUser(ctx.user.id)),
  }),

  integrations: router({
    registry: publicProcedure.query(() => GOVERNED_INTEGRATIONS),
  }),

  governance: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().int().min(1).max(100).default(25) }).optional())
      .query(({ ctx, input }) => db.listAuditEventsForActor(String(ctx.user.id), input?.limit)),
    request: protectedProcedure
      .input(
        z.object({
          provider: z.string().trim().min(1).max(128),
          action: z.string().trim().min(1).max(255),
          target: z.string().trim().min(1).max(512),
          riskLevel: z.enum(PERMISSION_LEVELS),
          summary: z.string().trim().min(1).max(2000),
          rollbackReference: z.string().trim().max(512).optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const preflight = governancePreflight(input);
        await db.recordAuditEvent({
          orgId: `user:${ctx.user.id}`,
          actorType: "user",
          actorId: String(ctx.user.id),
          provider: input.provider,
          action: input.action,
          target: input.target,
          riskLevel: input.riskLevel,
          inputHash: preflight.inputHash,
          status: preflight.status === "blocked" ? "draft" : preflight.status,
          result: {
            summary: input.summary,
            executionPermitted: false,
          },
          approvalRequired: preflight.approvalRequired,
          rollbackReference: input.rollbackReference ?? null,
        });

        return preflight;
      }),
    decide: protectedProcedure
      .input(
        z.object({
          eventId: z.number().int().positive(),
          decision: z.enum(["approved", "rejected"]),
          note: z.string().trim().max(1000).optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only an authenticated administrator can decide an approval request");
        }

        return db.decideAuditEvent(input.eventId, String(ctx.user.id), input.decision, input.note);
      }),
  }),
});

export type AppRouter = typeof appRouter;
