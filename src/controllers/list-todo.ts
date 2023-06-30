import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/todos', async (req: Request, res: Response) => {
  res.status(200).send('Ok');
});

export { router as listTodoRouter };
