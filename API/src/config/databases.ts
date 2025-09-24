import mysql from 'mysql2';
import { envs } from './envs';

export const pool = mysql.createPool({
    host: envs.MYSQL_HOST!,
    user: envs.MYSQL_USER!,
    password: envs.MYSQL_PASSWORD!,
    database: envs.MYSQL_DATABASE!
}).promise();