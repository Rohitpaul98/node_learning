const express = require("express")
const router = new express.Router();

//imported model
const Task = require('../models/task.model');

//importing auth middleware

const auth = require('../src/middlewares/auth')

//creates new task(here the owner field's value comes from auth middleware)
router.post('/create-task', auth, async (req, res) => {
    if (req.body) {
        const task = new Task({ ...req.body, owner: req.user._id });

        await task.save();
        res.status(201).send(task);
    }
    else {
        res.status(400).send("Bad Request");
    }
})

//fetches all the tasks
router.get('/all-tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find();
        if (!tasks) {
            return res.status(404).send();
        }
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

//fetches specific task by id
router.get('/task/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.find({ _id, owner: req.user._id });
        // const task = await req.user.populate('tasks')
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        // res.status(200).send(req.user.tasks);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

//update(patch) task by Id--patch changes specific field in document.

router.patch('/task/:id', auth, async (req, res) => {
    const toUpdate = Object.keys(req.body);
    const allowedToUpdate = ['task', 'description', 'isCompleted'];
    const validToUpdate = toUpdate.every((update) => { allowedToUpdate.includes(update) })

    // if (!validToUpdate) {
    //     return res.status(400).send({ message: 'Invalid Request' });
    // }
    try {
        const updatedTask = await Task.findByIdAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true, runValidators: true })
        if (!updatedTask) {
            return res.status(404).send({ message: "Task not found" })
        }
        res.status(200).send(updatedTask)

    } catch (error) {
        res.status(500).send({ message: "Task failed to be deleted!may be an internal server error" })
    }
})

//Delete task by  Id
router.delete("/task/:id", auth, async (req, res) => {
    try {
        _id = req.params.id;
        const deletedTask = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if (!deletedTask) {
            res.status(400).send({ message: "Task does not exist" })
        }
        res.status(200).send({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).send({ message: "Task failed to be deleted!may be an internal server error" })
    }
})

module.exports = router;