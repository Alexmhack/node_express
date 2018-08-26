import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	return res.status(200).send({
		'message': 'YAY! Congratulations your first endpoint is working!'
	});
})

app.listen(3000);
console.log('APP IS RUNNING ON PORT ', 3000);
