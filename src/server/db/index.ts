import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionsString = process.env.DATABASE_URL!;
console.log(connectionsString);
export const client = postgres(connectionsString, { prepare: false });
export const db = drizzle(client);
