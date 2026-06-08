import type { Express } from "express";
import path from "path";
import next from "next";

const ghostMonthDir = path.resolve(process.cwd(), "ghost-month");

export async function registerGhostMonth(app: Express): Promise<void> {
  const dev = process.env.NODE_ENV !== "production";
  const nextApp = next({
    dev,
    dir: ghostMonthDir,
    conf: { basePath: "/ghost-month" },
  });

  await nextApp.prepare();
  const handle = nextApp.getRequestHandler();

  app.all(/^\/ghost-month(\/.*)?$/, (req, res) => handle(req, res));
}
