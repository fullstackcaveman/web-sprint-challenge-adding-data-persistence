const db = require('../../data/dbConfig');

const getTasks = () => {
	return db('tasks');
};

module.exports = { getTasks };
