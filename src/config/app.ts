import dotenv from 'dotenv';
dotenv.config()

export default {
    "app": {
        APP_NAME: process.env.APP_NAME,
        PORT: process.env.PORT,
    },
    "database":{
        DB_MONGO_DB: process.env.DB_MONGO_DB,
    }
};
