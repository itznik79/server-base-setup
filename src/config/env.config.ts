import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT || '5000', 10),
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,
    DB_DIALECT: process.env.DB_DIALECT,
    REDIS_URL: process.env.REDIS_URL || 'localhost',
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: parseInt(process.env.REDIS_PORT || '5432', 10),
    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
    JWT_SECRET: process.env.JWT_SECRET || 'keyjwt',
}

