# node_express
working on a simple project built with node and express

For this project we are going to create a project using npm so for creating our project we 
need to run

```
npm init
```

You will be prompted with some options for setting up your project which will look something 
like this

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (node_express)
version: (1.0.0)
description: node express tutorial
entry point: (index.js)
test command:
git repository: (https://github.com/Alexmhack/node_express.git)
keywords:
author: Alexmhack
license: (ISC)
About to write to C:\Users\any-user\folder\inner-folder\node_express\package.json:

{
  "name": "node_express",
  "version": "1.0.0",
  "description": "node express tutorial",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Alexmhack/node_express.git"
  },
  "author": "Alexmhack",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Alexmhack/node_express/issues"
  },
  "homepage": "https://github.com/Alexmhack/node_express#readme"
}


Is this ok? (yes)
```

Now you should see a package.json file in your project which contains basic info about your 
project

# Dependencies
1. expressjs
2. momentjs
3. uuid npm package
4. babeljs
5. babel watch

```
npm install --save express moment uuid
npm install --save-dev babel-cli babel-preset-env babel-watch
```

After all the packages are done installing you should see those packages listed under the 
dependencies and devDependencies, and node_modules is the folder which contains the source 
code of the package we donwloaded.

# Server
For setting up server at port 3000 we create a new file named server.js that imports express
and create an express instance which uses express.json as middleware and finally we setup our
endpoint which sends a message to screen and listens at port 3000.

If you run the server using node server.js command, you will get an error because ES6 does not
support some of the features such as the import on line 1.

# Babel
babel will help us compile the code to ES5 that nodejs runtime can understand.

For setting up babel for our project so that our code compiles to ES5 that nodejs runtime can
understand, we can have to create a new file and name it **.babelrc** and add 

```
{
	"presets": ["env"]
}
```

Next open **package.json** file and add

```
"build": "babel server.js --out-dir build"
```

under script property, your file should look like

```
{
  "name": "node_express",
  "version": "1.0.0",
  "description": "node express tutorial",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
```

Now run

```
npm run build
```

When above command is successfull you should notice a new build folder that contains a 
server.js file which has original code compiled to ES5 so, running the command again inside
build folder should run your server withour error

```
node build/server.js
```

Navigate to 127.0.0.1:3000 on the browser and what do you know, you get the json data we send
from our server file, notice this line,

**server.js**
```
app.get('/', (req, res) => {
	return res.status(200).send({
		'message': 'YAY! Congratulations your first endpoint is working!'
	});
})
```

# Reflection Model
Just as python has __init__ method inside python class, C++ has constructor in their classes
which all does the same task of running itself as soon as a new instance of the class is 
created.

Javascript ES6 also has classes and constructors, for our simple project we don't use a
separate database for storing our data but we use javascript objects for data storage

models/Reflections.js
```
class Reflections {
	constructor() {
		this.reflections = [];
	}
}
```

Here we make a class Reflections that has a constructor which creates an array named 
reflections each time a new instance of class is created.

models/Reflections.js
```
class Reflections {
	create(data) {
		const newReflection = {
			id: uuid.v4(),
			success: data.success || '',
			lowPoint: data.lowPoint || '',
			takeAway: data.takeAway || '',
			createdDate = moment.now(),
			modifiedDate = moment.now()
		}

		this.reflections.push(newReflection);
		return newReflection;
	}
```

*create method* for our Reflections class does a very simple process, our model has id, 
success, lowPoint, takeAway, createdDate, modifiedDate, these all features take data from
the data argument passed in to our create method, the id has to be unique property for each
object so we use the uuid package which gives us a unique value for id field, then we have
createdDate and modifiedDate that uses the moment package which gives value of the current 
time.

Finally we push the object to our array and return the new object.

**findOne(id) findAll()** methods.

findOne() finds one object from our array and findAll() returns all the objects from array

**update(id, data)** method takes in the id of the object that has to be updated and data
from which we will update our object, we get the object to be updated from the findOne
method which takes in the id and then we update all the fields/properties of the object
and at last we return the object.

Next we create a delete method for deleting the object from reflections array using splice
method in javascript which takes in two arguments, first arg tells to delete from and 
second till which to delete.

# Reflection controller
We have five methods update, create, findOne, findAll, delete (CRUD) so just like we do in
django we need endpoints for these methods, controllers/Reflection.js is the file for it

```
const Reflection = {
	create (req, res) {
		if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
			return res.status(400).send({'message': 'All fields are required'})
		}

		const reflection = ReflectionModel.create(req.body);
		return res.status(201).send(reflection);
	},
	...
```

**NOTE:** don't forget to export our const with default

```
export default Reflection;
```

We complete this task by importing our reflection model in that file. We create a const
reflection variable which has all the methods separated by commas, first we check if the 
reflection exists and then we execute the process using the reflection model and if not 
exists we send a 404 status response with a reflection not found message

Next we need to add the urls for our reflections using the get, post, put methods of the
express module.

```
app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);
```

# Restart server on code changes
Every time we make changes in our code we need to stop and restart our server using 

```
npm run build
```

But babel-watch is the dev module for this purpose, we just have to add 

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel server.js --out-dir build",
    "dev-start": "babel-watch server.js"
  },
  ...
```

in the **package.json** file under *script*.

# POSTMAN
[Postman](https://www.getpostman.com/) app is a very powerful service which lets you deal
with the api using simple get, post, put methods and endpoints.

Run the server using

```
npm run dev-start
```

If any errors occurs, npm briefly explains the reason behind the error, I got an error which
says no module named 'moment', I simply installed the moment module again using 

```
npm install --save moment
```

Now using POSTMAN is very simple,
1. Select the method of request ```GET, POST, PUT, DELETE etc.```. 
2. Enter the url endpoint which for our project is ```http://127.0.0.1:3000/``` and other urls are defined in our server.js file
3. If the request method is POST we need to enter the body of data in JSON format in raw
for example,
	```
	{
		"success": "complete nodejs tutorial",
		"lowPoint": "time consuming",
		"takeAway": "learn a new language"
	}	
	```
4. Press Send and at the bottom of window you should see the response from the server.

# PostgreSQL
Now we will advance our project and use a [PostgreSQL](https://www.postgresql.org/) instead
of using JavaScript object datatype.

**Get Started**
Install [PostgreSQL](https://www.postgresql.org/) and to check if it is installed succesfully
run ```psql --help``` in command prompt or terminal and you will be given the list of 
commands for psql.

Just for clarity we have created two new folders in ```src``` folder namely usingJSObjects
and usingDB, we move our previous folders into usingJSObjects.

**Installing package**
```
npm install --save pg dotenv
```

**Setup database**

For setting our postgresql database we have to create a database for our reflection
project name the database *reflection_db*

**command prompt**
```
> psql -U postgres
password: enter-your-password-if-set

postgres=# CREATE DATABASE reflection_db;
CREATE DATABASE
```

**NOTE:** Don't forget the semicolon at the end of command, if have not set any 
password then you can simply type,

**command prompt**
```
createdb reflection_db
```

You can check if the database is successfully created using,

**psql command prompt**
```
postgres=# \l

reflection_db | postgres | UTF8     | ---------- | ---------- | ---------
```

# Configuring Database
Create a .env file in your root project folder and in that folder put the *
DATABASE_URL* for the project in format *
postgres://{db_username}:{db_password}@{host}:{port}/{db_name}*

**.env**
```
DATABASE_URL=postgres://userame:password@127.0.0.1:5432/reflection_db
```

**NOTE:** No space should be given on either sides of equal to sign.

This file won't be uploaded to github because it in the .gitignore file. If you 
choose to use an online database then put in the url for that database.

# Creating tables
Now in the file *db.js* located in the root folder, we will connect to our database
first and then create tables for reflection model

PG and dotenv are the packages that we will use now.

**db.js**
```
const { Pool } = require('pg');
const dotenv = require('dotenv');
```

Now using our Pool object we will create a new instance and specify our database url
and if database is connected we will log a message on console.

```
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
	console.log("CONNECTED TO DATABASE");
});
```

Now we will create table reflections which has the same fields from the previous javascript
object had,

1. id UUID PRIMARY KEY
2. success VARCHAR(128) NOT NULL,
3. low_point VARCHAR(128) NOT NULL
4. take_away VARCHAR(128) NOT NULL
5. created_date TIMESTAMP
6. modified_date TIMESTAMP

And we will do this inside a function,

**db.js**
```
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
```

Inside this large chunk of function, we first write the commands that will create a table
reflections for us which has all these fields which all goes inside a const variable inside
a string, we pass this const variable to *pool.query*, which will run those commands for us.

Once *pool.query* does its work we use the *.then* function which takes in the argument
res returned by pool.query and we log that response (res) and end our pool connection, if 
there are any errors we catch them and after printing them end our pool

We then make another function that simply drops the table reflections if it exists.

```
const dropTables = () => {
	const queryText = `DROP TABLE IF EXISTS reflections`;

	pool.query(queryText).then((res) => {
		console.log(res);
		pool.end();
	}).catch((err) => {
		console.log(err);
		pool.end();
	})
}
```

Once all of this is done we simply console a message for removed client and export our 
functions and lastly we require make-runnable package - We need this to be able to call and 
any of our two functions from the terminal. Note: You have to require make-runnable at the 
end. Also, don't forget to install make-runnable as project dev-dependency.
