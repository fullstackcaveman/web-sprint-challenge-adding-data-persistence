const express = require('express');
const Task = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Task.getTasks()
		.then((task) => {
			const tasks = [];

			task.map((completed) => {
				completed.task_completed === 1
					? tasks.push({ ...completed, task_completed: true })
					: tasks.push({ ...completed, task_completed: false });
			});

			res.json(tasks);
		})
		.catch(next);
});

router.post('/', (req, res, next) => {
	const task = req.body;

	Task.addTask(task)
		.then((task) => {
			if (task.task_completed === 1) {
				res.status(201).json({ ...task, task_completed: true });
			} else {
				res.status(201).json({ ...task, task_completed: false });
			}
		})
		.catch(next);
});

module.exports = router;
