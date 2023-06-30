import express, { Request, Response } from 'express';
import { query } from 'express-validator';
import { Todo } from '../models/todo';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

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
