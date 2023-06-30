import express, { Request, Response } from 'express';
import { query } from 'express-validator';
import { Todo } from '../models/todo';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

/**
 * @api {get} /api/todos Retrieve todos
 * @apiName GetTodos
 * @apiGroup Todo
 *
 * @apiParam {Number} [page=1] The current page.
 * @apiParam {Number} [size=10] The number of items per page.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "items": [],
 *       "pagination": {
 *       "page": 1,
 *       "size": 10,
 *       "total": 0
 *       }
 *     }
 */
router.get(
  '/api/todos',
  [
    query('page').optional().isInt({ min: 1 }),
    query('size').optional().isInt({ min: 1 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const size = req.query.size ? Number(req.query.size) : 10;

    const todos = await Todo.find({})
      .skip((page - 1) * size)
      .limit(size);

    const count = await Todo.count({});

    res.status(200).send({
      items: todos,
      pagination: {
        page,
        size,
        total: count,
      },
    });
  }
);

export { router as listTodoRouter };
