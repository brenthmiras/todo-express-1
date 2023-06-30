# todo-express-1

## Setup

Install dependencies:
```bash
npm install
```

Run dev environment in docker:
```bash
docker-compose up
# Access api from localhost:3000
```

Generate api doc:
```bash
npm run doc
# Access api doc from localhost:3000/apidoc
```

Testing:

```bash
# run all tests
npm run test
```

## Environment Variables

```bash
# URL of the Mongodb
MONGO_URI=mongodb://todos-mongo-srv:27017/todos

# Node env
NODE_ENV=development
```

## Project Structure

```
src\
 |--models\         # Contains model classes for each entity
 |--controllers\    # Route controllers
 |--errors\         # Contains error classes
 |--middlewares\    # Contains middlewares e.g. validation, error handling
 |--test\           # Contains setup file for jest
 |--apidoc\         # Contains generated static files for docs
 |--app.js          # Express app
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:

**Todo routes**:\
`GET /api/todos` - get all todos\
`POST /api/todos` - create todo\
`PUT /api/todos/:id` - update todo\
`DELETE /api/todos/:id` - delete todo
