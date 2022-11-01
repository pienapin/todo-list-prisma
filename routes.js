const { UserController } = require('./controllers/UserController');
const { TodoController } = require('./controllers/TodoController');

const _routes = [
  ['users', UserController],
  ['todos', TodoController],
];

const routes = (app) => {
  _routes.forEach(router => {
    const [ url, controller ] = router;
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;