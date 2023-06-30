import request from 'supertest';
import { app } from '../../app';
import { Todo, TodoAttrs } from '../../models/todo';

const createTodo = async (attrs: TodoAttrs) => {
  const todo = Todo.build({
    ...attrs,
  });

  await todo.save();

  return todo;
};

describe('GET /api/todos', () => {
  it('should update todo', async () => {
    const todo = await createTodo({
      title: 'My Todo',
    });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({
        title: 'New Title',
      })
      .expect(200);

    expect(res.body.title).toBe('New Title');
  });

  it('should return 404 when updating non existing todo', async () => {
    const todo = {
      title: 'Some Title',
    };

    const res = await request(app)
      .put('/api/todos/649e517aee5fac84a8127521')
      .send(todo)
      .expect(404);

    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toEqual({
      message: 'Not found',
    });
  });
});
