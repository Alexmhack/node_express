const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
	console.log('CONNECTED TO THE DB');
});

// creating tables
const createTables = () => {
	const queryText = 
		`CREATE TABLE IF NOT EXISTS
			reflections(
				id UUID PRIMARY KEY,
				success VARCHAR(128) NOT NULL,
				low_point VARCHAR(128) NOT NULL,
				take_away VARCHAR(128) NOT NULL,
				created_date TIMESTAMP,
				modified_date TIMESTAMP
			)`

	pool.query(queryText).then((res) => {
		console.log(res);
		pool.end();
	}).catch((err) => {
		console.log(err);
		pool.end();
	})
}
