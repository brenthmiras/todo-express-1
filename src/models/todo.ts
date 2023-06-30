import mongoose from 'mongoose';

/**
 * Required attributes for creating new Todo
 */
interface TodoAttrs {
  title: string;
  completed?: boolean;
}

/**
 * The attributes of a TodoModel instance.
 */
interface TodoDoc extends mongoose.Document {
  title: string;
  completed: boolean;
}

/**
 * This is for type hinting when instantiating a TodoModel
 */
interface TodoModel extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttrs): TodoDoc;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

ticketSchema.statics.build = (attrs: TodoAttrs) => {
  return new Todo(attrs);
};

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', ticketSchema);

export { Todo };
