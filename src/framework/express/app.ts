import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import os from "os";
import { IlearningENV } from "../../config/env.config";
import { adminApiPath, parentApiPath } from "../../shared/constant/constant";
import adminAuthRouter from "../../interface/route/admin/admin.auth.route";
import { ErrorHandler } from "../../interface/middleware/error.middelware";
import parentRouter from "../../interface/route/parent";
import adminRouter from "../../interface/route/admin";
const createApp = () => {
  const app: Application = express();

  app.use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      origin: [
        "http://localhost:3000",
        IlearningENV.origin.origin_1,
        IlearningENV.origin.origin_2,
        IlearningENV.origin.origin_3,
      ],
    })
  );

  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("OK");
  });

  app.get("/status", async (req: Request, res: Response) => {
    const healthData: any = {
      status: "OK",
      service: "Zwing API",
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memoryUsage: {
        rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB`,
      },
      system: {
        platform: os.platform(),
        arch: os.arch(),
        cpuCores: os.cpus().length,
        loadAvg: os.loadavg(),
      },
      version: process.env.APP_VERSION || "1.0.0",
    };

    try {
      const dbState = mongoose.connection.readyState;
      healthData.database = {
        connected: dbState === 1,
        state:
          dbState === 0
            ? "disconnected"
            : dbState === 1
              ? "connected"
              : dbState === 2
                ? "connecting"
                : "disconnecting",
      };

      if (dbState !== 1) {
        healthData.status = "DEGRADED";
        return res.status(503).json(healthData);
      }

      res.status(200).json(healthData);
    } catch (err) {
      res.status(500).json({
        status: "ERROR",
        message: "Health check failed",
        error: (err as Error).message,
      });
    }
  });

  app.use(adminApiPath.base, adminRouter);
  app.use(parentApiPath.base, parentRouter)

  app.use(ErrorHandler.handleErrors);

  return app;
};

export default createApp;