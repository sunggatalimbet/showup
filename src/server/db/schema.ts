import { pgTable, integer, varchar, boolean } from "drizzle-orm/pg-core";

export const dailyGoalsTable = pgTable("dailyGoals", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name").notNull(),
    completed: boolean("completed").notNull().default(false),
    imageUrl: varchar("image_url").notNull(),
    imageDescription: varchar("image_description").notNull(),
});
