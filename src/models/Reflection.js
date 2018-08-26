import moment from 'moment';
import uuid from 'uuid';

class Reflection {
	constructor() {
		this.reflections = [];
	}

	create(data) {
		const newReflection = {
			id: uuid.v4(),
			success: data.success || '',
			lowPoint: data.lowPoint || '',
			takeAway: data.takeAway || '',
			createdDate = moment.now(),
			modifiedDate = moment.now()
		};

		this.reflections.push(newReflection);
		return newReflection
	}

	findOne() {
		return this.reflections.find(reflect => reflect.id === id);
	}

	findAll() {
		return this.reflections;
	}
}
