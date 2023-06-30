import request from 'supertest';
import { app } from '../../app';
import { Todo } from '../../models/todo';

const createTodo = async () => {
  const todo = Todo.build({
    title: 'Sample Todo',
  });

  await todo.save();

  return todo;
};

it('can fetch a list of todos', async () => {
  await createTodo();
  await createTodo();
  await createTodo();

  const res = await request(app).get('/api/todos').send().expect(200);

  expect(res.body.length).toEqual(3);
});
