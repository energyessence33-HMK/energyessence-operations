import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// KINGDOM EXECUTOR STUDIO TABLES
// ============================================

/**
 * User Spiritual Profile
 * Stores Christ consciousness alignment, core values, and spiritual identity
 */
export const spiritualProfiles = mysqlTable("spiritual_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  coreValues: json("coreValues").$type<string[]>().default([]).notNull(),
  purposeStatement: text("purposeStatement"),
  alignmentScore: int("alignmentScore").default(0),
  lastCheckIn: timestamp("lastCheckIn").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SpiritualProfile = typeof spiritualProfiles.$inferSelect;
export type InsertSpiritualProfile = typeof spiritualProfiles.$inferInsert;

/**
 * Brand Identity
 * Stores user's brand name, colors, voice, and positioning
 */
export const brandIdentities = mysqlTable("brand_identities", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  brandName: varchar("brandName", { length: 255 }).notNull(),
  tagline: text("tagline"),
  colors: json("colors").$type<Record<string, string>>().default({}).notNull(),
  voiceAndTone: text("voiceAndTone"),
  targetAudience: text("targetAudience"),
  logoUrl: varchar("logoUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BrandIdentity = typeof brandIdentities.$inferSelect;
export type InsertBrandIdentity = typeof brandIdentities.$inferInsert;

/**
 * Generated Videos
 * Stores video metadata, status, and URLs
 */
export const videos = mysqlTable("videos", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  duration: mysqlEnum("duration", ["1_min", "3_min"]).notNull(),
  status: mysqlEnum("status", ["draft", "processing", "completed", "failed"]).default("draft").notNull(),
  script: text("script").notNull(),
  videoUrl: varchar("videoUrl", { length: 512 }),
  thumbnailUrl: varchar("thumbnailUrl", { length: 512 }),
  klingVideoId: varchar("klingVideoId", { length: 255 }),
  style: mysqlEnum("style", ["professional", "creative", "minimal"]).default("professional").notNull(),
  voiceover: mysqlEnum("voiceover", ["male", "female", "narrator"]).default("narrator").notNull(),
  views: int("views").default(0),
  engagementScore: decimal("engagementScore", { precision: 5, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

/**
 * Workflows / Tasks
 * Stores user's workflow tasks with dependencies and status
 */
export const workflows = mysqlTable("workflows", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["active", "completed", "paused"]).default("active").notNull(),
  dependencies: json("dependencies").$type<string[]>().default([]).notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high"]).default("medium").notNull(),
  dueDate: timestamp("dueDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflow = typeof workflows.$inferInsert;

/**
 * Scheduled Posts
 * Stores content scheduled for publishing across platforms
 */
export const scheduledPosts = mysqlTable("scheduled_posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  scheduledTime: timestamp("scheduledTime").notNull(),
  platforms: json("platforms").$type<string[]>().default([]).notNull(),
  status: mysqlEnum("status", ["scheduled", "published", "failed"]).default("scheduled").notNull(),
  psychologyScore: int("psychologyScore").default(0).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ScheduledPost = typeof scheduledPosts.$inferSelect;
export type InsertScheduledPost = typeof scheduledPosts.$inferInsert;

/**
 * Learning Progress
 * Tracks user's course completion and certifications
 */
export const learningProgress = mysqlTable("learning_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  completedCourses: json("completedCourses").$type<string[]>().default([]).notNull(),
  currentCourse: varchar("currentCourse", { length: 255 }),
  badges: json("badges").$type<string[]>().default([]).notNull(),
  totalHoursLearned: decimal("totalHoursLearned", { precision: 8, scale: 2 }).default("0").notNull(),
  lastActivityAt: timestamp("lastActivityAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LearningProgress = typeof learningProgress.$inferSelect;
export type InsertLearningProgress = typeof learningProgress.$inferInsert;

/**
 * Monetization Data
 * Tracks user's revenue streams and financial metrics
 */
export const monetizationData = mysqlTable("monetization_data", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  activeStreams: json("activeStreams").$type<string[]>().default([]).notNull(),
  monthlyRevenue: decimal("monthlyRevenue", { precision: 12, scale: 2 }).default("0").notNull(),
  projectedRevenue: decimal("projectedRevenue", { precision: 12, scale: 2 }).default("0").notNull(),
  totalRevenue: decimal("totalRevenue", { precision: 12, scale: 2 }).default("0").notNull(),
  customers: int("customers").default(0),
  conversionRate: decimal("conversionRate", { precision: 5, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MonetizationData = typeof monetizationData.$inferSelect;
export type InsertMonetizationData = typeof monetizationData.$inferInsert;

/**
 * Ecosystems
 * Stores user's brand ecosystems (EnergyEssence, HitmaKING, THOUGHT2PONDER)
 */
export const ecosystems = mysqlTable("ecosystems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isActive: boolean("isActive").default(false).notNull(),
  color: varchar("color", { length: 7 }),
  icon: varchar("icon", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Ecosystem = typeof ecosystems.$inferSelect;
export type InsertEcosystem = typeof ecosystems.$inferInsert;

/**
 * Integrations
 * Stores third-party integrations (Zapier, Make, webhooks)
 */
export const integrations = mysqlTable("integrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["zapier", "make", "webhook", "custom"]).notNull(),
  webhookUrl: varchar("webhookUrl", { length: 512 }),
  apiKey: varchar("apiKey", { length: 512 }),
  isActive: boolean("isActive").default(true).notNull(),
  lastSyncAt: timestamp("lastSyncAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Integration = typeof integrations.$inferSelect;
export type InsertIntegration = typeof integrations.$inferInsert;

/**
 * Analytics Events
 * Tracks user behavior and engagement metrics
 */
export const analyticsEvents = mysqlTable("analytics_events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  eventType: varchar("eventType", { length: 255 }).notNull(),
  eventData: json("eventData").$type<Record<string, any>>().default({}).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;
