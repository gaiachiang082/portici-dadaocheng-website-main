import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { mysqlTlsOptions, parseMysqlDatabaseUrl } from "./server/_core/mysqlUrl";

const connectionString = process.env.MYSQL_DATABASE?.trim();
if (!connectionString) {
  throw new Error("MYSQL_DATABASE is required to run drizzle commands");
}

let dbCredentials: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: typeof mysqlTlsOptions;
};

try {
  const p = parseMysqlDatabaseUrl(connectionString);
  dbCredentials = {
    host: p.host,
    port: p.port,
    user: p.user,
    password: p.password,
    database: p.database,
    // mysql2 + drizzle-kit: 僅 `url` 時不會帶入與執行時相同的 TLS 設定；與 server/db.ts 對齊以免 migrate 與 runtime 行為不一致
    ssl: mysqlTlsOptions,
  };
} catch {
  throw new Error(
    "MYSQL_DATABASE must be a valid mysql:// or mysql2:// connection URL (same format as server/db.ts)."
  );
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials,
});
