const express = require('express');
const Resource = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Resource.getResources()
		.then((resource) => {
			res.json(resource);
		})
		.catch(next);
});

module.exports = router;
