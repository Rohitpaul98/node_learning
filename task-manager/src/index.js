const dotenv = require('dotenv')
dotenv.config({ path: './config/dev.env' });
require('./db/mongod') //database connection file
const express = require('express');

//imported seprate created routes
const userRoutes = require('../router/user-routes');
const taskRoutes = require("../router/task-routes");

const app = express();// created express server app
const port = process.env.PORT;
app.listen(port, () => {
    console.log('Welcome! listening at ' + port);
})
// app.use((req, res, next) => {

//     if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
//         res.status(503).send('OOPS! site is under maintenance');
//     }


// })
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);


// const multer = require('multer');
// const upload = multer({
//     dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// })

// const Task = require('../models/task.model')
// const User = require('../models/User.model')
// const main = async () => {
// const task = await Task.findById('65f1ff8f99b62fe415a60f38')
// const user = await User.findById('65c7c1942609ba8773d54d8a')
// console.log(user)
// await task.populate('owner')
// await user.populate('tasks')//tasks is a virtual field
// console.log(task.owner)
// console.log(user.tasks)

// }

// main()
