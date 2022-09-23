import dotenv from 'dotenv'
dotenv.config()

export const config = {
	secretKey: process.env.SECRET_KEY,
	serviceName: process.env.SERVICE_NAME,
	dbUser: process.env.DB_USER,
	dbPass: process.env.DB_PASS,
}