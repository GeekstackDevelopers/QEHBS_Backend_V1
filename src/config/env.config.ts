
import dotenv from "dotenv"
dotenv.config();



export const IlearningENV = Object.freeze({
    mongodb: {
        URI: process.env.MONGO_URL!
    },
    origin: {
        origin_1: process.env.ORIGIN_1!,
        origin_2: process.env.ORIGIN_2!,
        origin_3: process.env.ORIGIN_3!,
    },
   
    node_env: process.env.NODE_ENV!,
    port: process.env.PORT!,
    mail:{
        user:process.env.APP_MAIL_USER!,
        password:process.env.APP_MAIL_PASSWORD!,
    }
})