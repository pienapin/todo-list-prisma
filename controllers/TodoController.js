const { Router } = require('express');
const m$todo = require('../modules/todo.module');
const response = require('../helpers/response');
const cookieJwtAuth = require('../helpers/cookieJwtAuth');

const TodoController = Router();

TodoController.get('/', cookieJwtAuth, async (req, res) => {
  const list = await m$todo.listTodo(req.user.id);
  response.sendResponse(res, list);
});

TodoController.post('/add', cookieJwtAuth, async (req, res) => {
  const userId = req.user.id;
  const body = req.body;
  const add = await m$todo.addTodo(userId, body);
  response.sendResponse(res, add);
});

TodoController.put('/edit/:id', cookieJwtAuth, async (req, res) => {
  const body = req.body;
  const id = parseInt(req.params.id);
  const edit = await m$todo.editTodo(id, body);
  response.sendResponse(res, edit);
});

TodoController.delete('/delete/:id', cookieJwtAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const del = await m$todo.deleteTodo(id);
  response.sendResponse(res, del);
});

module.exports = { TodoController };