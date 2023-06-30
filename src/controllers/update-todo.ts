import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Todo } from '../models/todo';
import { validateRequest } from '../middlewares/validate-request';
import { NotFoundError } from '../errors/not-found-error';

const router = express.Router();

/**
 * @api {put} /api/todos/:id Update todos
 * @apiName PutTodos
 * @apiGroup Todo
 *
 * @apiParam {String} title The todo's title
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "title": "New Title",
 *         "completed": false,
 *         "_id": "649e517aee5fac84a812752a",
 *         "__v": 0
 *     }
 *
 *
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
router.put(
  '/api/todos/:id',
  [body('title').isString().withMessage('Title is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError();
    }

    todo.set({
      title: req.body.title,
    });

    await todo.save();

    res.status(200).send(todo);
  }
);

export { router as updateTodoRouter };
