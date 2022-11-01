const prisma = require('../helpers/database');
const bcrypt = require('bcryptjs');

class _user {
  listUser = async () => {
    try {
      const list = await prisma.user.findMany();

      return {
        status: true,
        data: list,
      }
    } catch (error) {
      console.error('listUser user module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  findUser = async (id) => {
    try {
      const find = await prisma.user.findUnique({
        where: {
          id: id,
        }
      });

      return {
        status: true,
        data: find,
      }
    } catch (error) {
      console.error('listUser user module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  addUser = async (body) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      const add = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hash,
        },
      });

      return {
        status: true,
        msg: 'Register Successful!',
      }
    } catch (error) {
      console.error('addUser user module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  loginUser = async (email, password) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        }
      });
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        return {
          status: true,
          data: user,
          msg: 'Login Successful!',
        }
      } else {
        return {
          status: false,
          msg: 'Wrong Password!'
        }
      }
    } catch (error) {
      console.error('addUser user module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  editUser = async (id, body) => {
    // try {
    //   let password = body.password;
    //   const salt = await bcrypt.genSalt(10);
    //   const hash = await bcrypt.hash(password, salt);
    //   const edit = await prisma.user.update({
    //     where: {
    //       id: parseInt(id),
    //     },
    //     data: {
    //       password: hash,
    //     },
    //   });

    // } catch (error) {

    // }
    try {
      const edit = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: body.name,
        },
      });

      return {
        status: true,
        msg: 'Edit Successful!',
      }
    } catch (error) {
      console.error('editUser user module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }

  deleteUser = async (id) => {
    try {
      const del = await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      return {
        status: true,
        msg: 'User Deleted!',
      }
    } catch (error) {
      console.error('deleteUser user module Error: ', error);

      return {
        status: false,
        error
      }
    }
  }
}

module.exports = new _user();