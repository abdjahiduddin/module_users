import dotenv from "dotenv";

dotenv.config()

const config = {
    env : process.env.NODE_ENV || 'dev',
    port : process.env.PORT || 8080,
    db_port: process.env.DB_PORT, 
    db_name : process.env.DB_NAME,
    db_username : process.env.DB_USER,
    db_password : process.env.DB_PASSWORD,
    db_host : process.env.DB_HOST
}

export default config