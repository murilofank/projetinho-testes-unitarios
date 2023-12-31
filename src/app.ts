import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/AppError';

const app = express();

createConnection();
app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
        });
    }

    return response.status(500).json({
        status: 'Error',
        message: `Internal server error ${error.message}`,
    });
});

export { app };