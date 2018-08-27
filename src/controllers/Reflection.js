import ReflectionModel from '../models/Reflection';

const Reflection = {
	create (req, res) {
		if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
			return res.status(400).send({'message': 'All fields are required'})
		}

		const reflection = ReflectionModel.create(req.body);
		return res.status(201).send(reflection);
	}

}
