import { connect } from 'mongoose';
import { exit } from 'process';
import { IlearningENV } from './env.config';
import dotenv from "dotenv"
dotenv.config();

const connectMongoDB = async (): Promise<void> => {
    try {
        console.log(" connenctig ",IlearningENV.mongodb.URI)
        const dbConnection = await connect(IlearningENV.mongodb.URI);
        console.log(`db connected to ${dbConnection.connection.host}`)
    } catch (error) {
        console.log(error)
        exit(0);
    }
}


export default connectMongoDB