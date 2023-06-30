import express from 'express';
import { json } from 'body-parser';
import { listTodoRouter } from './controllers/list-todo';
import { errorHandler } from './middlewares/error-handler';
import { newTodoRouter } from './controllers/new-todo';

const app = express();

app.use(json());

/**
 * Register routes
 */
app.use(listTodoRouter);
app.use(newTodoRouter);

if (process.env.NODE_ENV === 'development') {
  app.use('/apidoc', express.static(__dirname + '/apidoc'));
}

app.use(errorHandler);

export { app };
