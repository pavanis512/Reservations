import { connect } from 'mongoose';
import config from './app';

const connectDB = async () => {
    try {
        await connect(<string>config.database.DB_MONGO_DB);
        console.log('MongoDB Connected Successfully!')
    } catch (error: any) {
        console.log('Unable to connect:', error.message);
    }
}

export default { connectDB }