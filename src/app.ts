import express from 'express';
import { json } from 'body-parser';
import { listTodoRouter } from './controllers/list-todo';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(json());

/**
 * Register routes
 */
app.use(listTodoRouter);

app.use(errorHandler);

export { app };
