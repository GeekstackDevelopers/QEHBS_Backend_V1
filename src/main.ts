import connectMongoDB from "./config/mongo.config";
import createApp from "./framework/express/app";


connectMongoDB();
const app = createApp();

export default app;