import 'dotenv/config';
import { get } from "env-var";

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MYSQL_HOST: get('MYSQL_HOST').required().asString(),
    MYSQL_USER: get('MYSQL_USER').required().asString(),
    MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
    MYSQL_DATABASE: get('MYSQL_DATABASE').required().asString(),
}