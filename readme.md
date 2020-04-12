## Kindling: Starter Backend

### Running it:

- Have Mongo installed and in a separate terminal run `mongod`.
- Use `yarn run debug` to start the server in Development Mode.
- (Optional) If using VS Code use the "Start Server" debug config
- Navigate to `http://localhost:4000/` to execute queries and mutations.

### Setup for Production:

- Create a .env inside `src/` with Mongo variables
- Use `yarn build` to compile it with babel
- Use `yarn serve` to run the server.

### Dependencies:

- Graphql-Yoga
- Mongoose
- Nodemon
