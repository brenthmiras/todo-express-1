import express from 'express';
import { json } from 'body-parser';
import { listTodoRouter } from './controllers/list-todo';

const app = express();

app.use(json());

/**
 * Register routes
 */
app.use(listTodoRouter);

export { app };
