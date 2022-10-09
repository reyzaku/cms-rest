// app.js
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session'
import { default as connectMongoDbSession } from 'connect-mongodb-session'
import { fileURLToPath } from 'url';
import cors from 'cors'
import { config } from './app/config.js';
import authRoute from './app/auth/router.js'
import profileRoute from './app/profile/router.js'
import userRoute from './app/user/router.js'
import articleRoute from './app/articles/router.js'
import tagRoute from './app/tags/router.js'
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoDBStore = connectMongoDbSession(session)


const store = new mongoDBStore({
	uri: `mongodb+srv://${config.dbUser}:${config.dbPass}@cluster0.anzyyek.mongodb.net/?retryWrites=true&w=majority`,
	collection: 'session-cms'
})

app.use(session({
	secret: config.secretKey,
	cookie: {
		secure: 'auto',
		maxAge: 1000 * 60 * 60 * 24 * 1 // 1 Day
	},
	store: store,
	saveUninitialized: true,
	resave: false
}))

app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1', authRoute)
app.use('/api/v1', profileRoute)
app.use('/api/v1', userRoute)
app.use('/api/v1', articleRoute)
app.use('/api/v1', tagRoute)



// catch 404 and forward to error handler
app.use('*', function (req, res, next) {
	res.status(404).send('Page Not Found!')
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: err
	});
});


export default app;