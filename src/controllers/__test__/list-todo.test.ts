import request from 'supertest';
import { app } from '../../app';
import { Todo, TodoAttrs } from '../../models/todo';

const todosJSON = require('../__fixtures__/todos');

const createTodo = async (attrs: TodoAttrs) => {
  const todo = Todo.build({
    ...attrs,
  });

  await todo.save();

  return todo;
};

describe('GET /api/todos', () => {
  it('should fetch todos on page 1 by default', async () => {
    await Promise.all(todosJSON.map((t: TodoAttrs) => createTodo(t)));

    const res = await request(app).get('/api/todos').send().expect(200);

    expect(res.body.items).toHaveLength(10);

    expect(res.body.pagination).toEqual({
      page: 1,
      size: 10,
      total: 25,
    });
  });

  it('should fetch todos on other pages', async () => {
    await Promise.all(todosJSON.map((t: TodoAttrs) => createTodo(t)));

    const res = await request(app).get('/api/todos?page=3').send().expect(200);

    expect(res.body.items).toHaveLength(5);

    expect(res.body.pagination).toEqual({
      page: 3,
      size: 10,
      total: 25,
    });
  });

  it('should fetch todos by limit', async () => {
    await Promise.all(todosJSON.map((t: TodoAttrs) => createTodo(t)));

    const res = await request(app).get('/api/todos?size=5').send().expect(200);

    expect(res.body.items).toHaveLength(5);

    expect(res.body.pagination).toEqual({
      page: 1,
      size: 5,
      total: 25,
    });
  });
});
