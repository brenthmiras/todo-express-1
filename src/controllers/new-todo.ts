import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Todo } from '../models/todo';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

/**
 * @api {post} /api/todos Create todos
 * @apiName PostTodos
 * @apiGroup Todo
 *
 * @apiParam {String} title The todo's title
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "title": "Sample Todo",
 *         "completed": false,
 *         "_id": "649e517aee5fac84a812752a",
 *         "__v": 0
 *     }
 */
router.post(
  '/api/todos',
  [body('title').isString().withMessage('Title is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const todo = Todo.build({
      title,
    });

    await todo.save();

    res.status(200).send(todo);
  }
);

export { router as newTodoRouter };
