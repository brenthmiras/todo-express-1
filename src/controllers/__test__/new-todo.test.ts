import request from 'supertest';
import { app } from '../../app';

describe('POST /api/todos', () => {
  it('should create todo when passing complete payload', async () => {
    const todo = {
      title: 'My Sample Todo',
    };

    const res = await request(app).post('/api/todos').send(todo).expect(200);

    expect(res.body).toBeTruthy();
    expect(res.body.title).toEqual(todo.title);
  });

  it('should return 400 when missing required fields', async () => {
    const todo = {};

    const res = await request(app).post('/api/todos').send(todo).expect(400);

    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toEqual({
      message: 'Title is required',
      field: 'title',
    });
  });
});
