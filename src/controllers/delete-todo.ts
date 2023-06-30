import express, { Request, Response } from 'express';
import { Todo } from '../models/todo';
import { NotFoundError } from '../errors/not-found-error';

const router = express.Router();

/**
 * @api {delete} /api/todos/:id Delete todos
 * @apiName DeleteTodos
 * @apiGroup Todo
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "errors": [
 *             {
 *                 "message": "Not found"
 *             }
 *         ]
 *     }
 */
router.delete('/api/todos/:id', async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new NotFoundError();
  }

  await Todo.deleteOne({ _id: todo._id });

  res.status(200).send({});
});

export { router as deleteTodoRouter };
