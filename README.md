# MERN-stack-mysql

Based on this site 
* [MERN Stack con MySQL - React MySQL CRUD (Context API, TailwindCSS)](https://www.youtube.com/watch?v=dJbd7BYofp4) .
* [MERN Stack Tutorial - Book Store Project](https://www.youtube.com/watch?v=-42K44A1oMA).
* [Build REST API with NodeJS, MySQL, Sequelize, Typescript, Express step by step 2022 | REST API MySQL](https://www.youtube.com/watch?v=UcwT1SAvxG0).

## Starting steps
1. Install NPM and NODEJS in your system, using the `nvm`:
  [Install multiple versions of Node.js on Windows](https://rafaelneto.dev/blog/instalar-multiples-versiones-nodejs-windows/).
2. Create two directories in the root:
* backend
* frontend
3. In the same root using a terminal run this code, to create the "package.json" file:
```bash
npm init -y
```
4. Add in the "package.json" file below `"description":`, this one:
```json
      "type": "module",
```
5. install the libraries to use:
* `express`, the api and rest backend-server.
* `mysql2`, to connect to MySQL and promise support.
* `morgan`, to see by console the messages comming to backend.
* .
```bash
pnpm i express mysql2 morgan
```
6. Install as develop the `nodemon` library, to keeps the backend-server running.
```bash
pnpm i nodemon -D
```
### Note: those were my dependencies versions:
+ express 4.18.2
+ morgan 1.10.0
+ mysql2 3.6.0
+ nodemon 3.0.1
7. Create a "index.js" and "config.js" files into "backend" directory.
8. Complete the "config.js" file with the `PORT` configuration:
```js
    export const PORT = process.env.PORT || 49146;
```
9. Fill the "index.js" with the basic `express` information to start the backend-server:
```js
    import express from 'express';
    import {PORT} from './config.js';

    const app = express();

    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}`);
    });
```
10. Change the `"scripts":{}` in "package.json" file:
```json
      "scripts": {
        "start": "node ./backend/index.js",
        "dev": "nodemon ./backend/index.js"
      },
```
11. finally you can run in the Terminal, the command to start the backend-server.
```bash
pnpm dev
```
