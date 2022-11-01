const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express()
const port = 8000

// Handle Cors, Form Data, and JSON
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// REST API Routes
app.get('/', async (req, res) => {
  res.send({
    message: 'Hello this is API from Express Tutorial'
  })
});

routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// async function main() {
//   // const todo = await prisma.todo.create({
//   //   data: {
//   //     userId: 10,
//   //     description: 'ngetes lagi, harusnya error',
//   //   },
//   // });
//   const user = await prisma.user.findMany();
//   console.log(user);
//   const todoList = await prisma.todo.findMany();
//   console.log(todoList);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });