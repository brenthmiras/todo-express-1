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

describe('DELETE /api/todos/:id', () => {
  it('should delete todo', async () => {
    const todo = await createTodo({
      title: 'My Todo',
    });

    await request(app).delete(`/api/todos/${todo._id}`).send().expect(200);

    const existingTodo = await Todo.findById(todo._id);

    expect(existingTodo).toBeFalsy();
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
