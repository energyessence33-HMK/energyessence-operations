import { COOKIE_NAME } from "../shared/const.js";
import { GOVERNED_INTEGRATIONS } from "../lib/gateway/integration-registry";
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
});

export type AppRouter = typeof appRouter;
