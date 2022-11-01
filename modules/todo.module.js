const prisma = require('../helpers/database');

class _todo {
  listTodo = async (id) => {
    try {
      const list = await prisma.todo.findMany({
        where: {
          userId: id,
        }
      });

      return {
        status: true,
        data: list,
      }
    } catch (error) {
      console.error('listTodo todo module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  addTodo = async (userId, body) => {
    try {
      const add = await prisma.todo.create({
        data: {
          userId: userId,
          description: body.description,
        },
      });

      return {
        status: true,
        msg: 'Todo added!',
      }
    } catch (error) {
      console.error('addTodo todo module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  editTodo = async (id, body) => {
    try {
      const edit = await prisma.todo.update({
        where: {
          id: parseInt(id),
        },
        data: body,
      });

      return {
        status: true,
        msg: 'Edit Successful!',
      }
    } catch (error) {
      console.error('editTodo todo module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  deleteTodo = async (id) => {
    try {
      const del = await prisma.todo.delete({
        where: {
          id: parseInt(id),
        },
      });

      return {
        status: true,
        msg: 'todo Deleted!',
      }
    } catch (error) {
      console.error('deleteTodo todo module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }
}

module.exports = new _todo();