require('dotenv').config()
const { Router } = require('express');
const m$user = require('../modules/user.module');
const response = require('../helpers/response');
const cookieJwtAuth = require('../helpers/cookieJwtAuth');
const jwt = require('jsonwebtoken');

const UserController = Router()
// var userSigned;

UserController.get('/', async (req, res) => {
  const list = await m$user.listUser();
  response.sendResponse(res, list);
});

UserController.get('/test', cookieJwtAuth, async (req, res) => {
  const find = await m$user.findUser(req.user.id);
  response.sendResponse(res, find);
});

UserController.post('/register', async (req, res) => {
  const body = req.body;
  const add = await m$user.addUser(body);
  response.sendResponse(res, add);
});

UserController.post('/logout', async (req, res) => {
  res.clearCookie('token');
  message = "User Logged out!"
  response.sendResponse(res, message);
});

UserController.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await m$user.loginUser(email, password);
  if (user.status) {
    const token = jwt.sign(user.data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
    res.cookie("token", token, {
      httpOnly: true,
    });
  }
  response.sendResponse(res, user);
});

UserController.put('/edit', cookieJwtAuth, async (req, res) => {
  const body = req.body;
  const edit = await m$user.editUser(req.user.id, body);
  response.sendResponse(res, edit);
});

UserController.delete('/delete', cookieJwtAuth, async (req, res) => {
  const del = await m$user.deleteUser(req.user.id);
  res.clearCookie('token');
  response.sendResponse(res, del);
});

module.exports = { UserController };