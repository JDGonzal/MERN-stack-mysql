import * as dotenv from 'dotenv';
dotenv.config();
// set port, listen for requests
export const PORT = process.env.PORT || 49146;
export const MYSQL_HOST = process.env.MYSQL_HOST;
export const MYSQL_PORT = process.env.MYSQL_PORT;
export const MYSQL_D_B_= process.env.MYSQL_D_B_;
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_PASS = process.env.MYSQL_PASS;
