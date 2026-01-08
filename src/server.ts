import http from "http";
import connectMongoDB from "./config/mongo.config";

import { IlearningENV } from "./config/env.config";
import createApp from "./framework/express/app";

const PORT = Number(IlearningENV.port) || 3000;

async function start() {
  try {
    console.log("BOOT: starting server");

    const app = createApp();
    const server = http.createServer(app);

    // 1️⃣ Start HTTP server immediately (non-blocking)
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });

    // 2️⃣ Connect DB (awaited but does NOT block HTTP listening)
    console.log("Connecting MongoDB... latest..... buddy");
    await connectMongoDB();
    console.log("MongoDB connected");



  } catch (error) {
    console.error("BOOT FAILED ❌", error);
    process.exit(1);
  }
}

start();
