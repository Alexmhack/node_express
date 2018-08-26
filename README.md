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
