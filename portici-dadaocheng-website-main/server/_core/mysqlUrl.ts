/**
 * Parse MYSQL_DATABASE (mysql://…) into mysql2 connection fields.
 * Mirrors the previous inline parsing in server/db.ts.
 */
export function parseMysqlDatabaseUrl(connectionString: string): {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
} {
  const dbUrl = new URL(connectionString);
  return {
    host: dbUrl.hostname,
    port: dbUrl.port ? Number(dbUrl.port) : 3306,
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.replace(/^\//, ""),
  };
}

/** TLS options for mysql2 / Drizzle Kit against hosted MySQL or TiDB. */
export const mysqlTlsOptions = {
  minVersion: "TLSv1.2" as const,
  /** Railway MySQL uses a chain that includes self-signed CAs; strict verification fails with HANDSHAKE_SSL_ERROR. */
  rejectUnauthorized: false as const,
};
