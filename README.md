# MERN-stack-mysql

Based on this sites: 
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
## ****************************************************************
## Sitation in the "Git bash" Terminal to show the current branch 
1. I ran this simple command in the Terminal
```bash
git branch
```
And It showme and error like `fatal: detected dubious ownership in repository`
2. Then it suggest to run this command
```bash
git config --global --add safe.directory x:\path\directory\name
```
Just change the text `x:\path\directory\name`, for the real directory path.
## ****************************************************************

## Adding the database connection
1. Stop the backend-server if it is running.
2. Rename the "index.js" to "app.js".
3. Open the Packcge.json" file an rename all "index.js" by "app.js".
4. Run again the server `pnpm dev`.
5. Create in the "backend" directory the "config" directory.
6. Move the "config.js" file into this new "config" directory.
7. Add a ".env" file in the root of the directory, whit this data
```yml
    #------ MYSQL CONNECTION TO ANY SERVER -------
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASS=******
    MYSQL_D_B_=mern_stack_1
    MYSQL_PORT=3306
```
Change `MYSQL_PASS` by the correct in your system.
8. Install the program to read the ".env" file.
```bash
pnpm i dotenv
```
9. Call this file in the "config.js" file like this:
```js
    import * as dotenv from 'dotenv';
    dotenv.config();
```
10. Use one of this data in the "config.js" file:
```js
    export const MYSQL_HOST = process.env.MYSQL_HOST;
```
11. Just for test if this value is in use add this in in "app.js" file
```js
    import {PORT, MYSQL_HOST} from './config/config.js';
    ...
    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT},${MYSQL_HOST}`);
    });
```
12. If it is showing in the terminal this `Server is running on port 49146,localhost`, then delete this new info in the "app.js" file.

### Note: In the Video it is an explanation of the Create a MySQL-Server with a Docker, but I previously have a MySQL Server installed.

13. Lets to a create a Database in MySQL server with the name: `mern_stack_1`, I use to use in "Character set" : `utf8 -- UTF-8 Unicode` and in the "Collation": `utf8_general_ci`.
14. Finally adding code in the "db.js" file:
```js
    import { createPool } from 'mysql2/promise';
    import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_D_B_ } from './config.js';

    console.log('MYSQL_HOST', MYSQL_HOST);
    export const pool = createPool({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASS, 
      database: MYSQL_D_B_,
    });
```
15. Create a new directory called "routes" in the "backend" directory.
16. Create a file called "index.routes.js" into this "routes" directory.
17. Just import `{Router}` from 'express', in "index.routes.js" file.
18. Create a router from `Router()`;
19. import `{pool}` from '../config/db.js', in "index.routes.js" file.
20. Create an basic empty router and export it:
```js
    router.get('/ping', async(req, res) => {
    })
    export default router;
```
21. this is the data inside this new `router.get`:
```js
    router.get('/ping', async (req, res) => {
      const [rows, fields]=await pool.execute('SELECT 1+1 as result');
      console.log(rows, fields);
      res.json("ping");
    })
``` 
22. In "app.js" file  add `import indexRoutes from './routes/index.routes.js';`.
23. Add in "app.js" file this: `app.use(indexRoutes);`.
24. test in the Brwoser using this URL: [localhost:49146/ping](http://localhost:49146/ping), the aswer must be `"ping"`, and in the Terminal must show
```bash
[ { result: 2 } ] [ `result` BIGINT(3) NOT NULL ]
```
