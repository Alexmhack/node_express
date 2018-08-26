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
