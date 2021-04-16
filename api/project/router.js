const express = require('express');
const Project = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Project.getProjects()
		.then((project) => {
			const projects = [];

			// Mapping through the response to change boolean to true/false
			project.map((completed) => {
				completed.project_completed === 1
					? projects.push({ ...completed, project_completed: true })
					: projects.push({ ...completed, project_completed: false });
			});

			res.json(projects);
		})
		.catch(next);
});

router.post('/', (req, res, next) => {
	const project = req.body;

	Project.addProject(project)
		.then((project) => {
			// Returning response with converted boolean
			if (project.project_completed === 1) {
				res.status(201).json({ ...project, project_completed: true });
			} else {
				res.status(201).json({ ...project, project_completed: false });
			}
		})
		.catch(next);
});

module.exports = router;
