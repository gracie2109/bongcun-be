// libraries
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import session, { MemoryStore } from 'express-session'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport';

import {engine} from 'express-handlebars';


import './api/auth/googlePassport'
import './api/auth/localPassport'

// routers
import path from 'path'
import rootRouter from './api/routes'
import AppConfig from './configs/app.config'
import { HttpStatusCode } from './configs/statusCode.config'
import {createAdminServer} from "./api/services/createAdmin.server";
import * as bodyParser  from  "body-parser"
import UserModel from "./api/models/user.model";

import cloudinary from "./configs/cloudinary"
// resolve path
const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

/* Initialize Express app */
const app = express()

/* Request body parser */
app.use(express.json())
/* Security request headers */
app.use(
	helmet({
		contentSecurityPolicy: {
			useDefaults: false,
			directives: {
				...helmet.contentSecurityPolicy.getDefaultDirectives(),
				'style-src': ["'self'", "'unsafe-inline'", AppConfig.BOOTSTRAP_ICONS_CDN],
				'script-src': ["'self'", "'unsafe-inline'", AppConfig.TAILWIND_CDN]
			}
		},
		// referrerPolicy: {
		// 	policy: 'strict-origin-when-cross-origin'
		// }
	})
)

/* Logger */
app.use(morgan('tiny'))


/* Using Session - Cookies */
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	session({
		saveUninitialized: false,
		secret: AppConfig.KEY_SESSION,
		store: new MemoryStore(),
		resave: true,
		// cookie: {
		// 	sameSite: 'none',
		// 	path: '/'
		// }
	})
)

/* Enabling CORS */
app.use(
	cors({
		origin: [process.env.MAIN_FRONTEND_URL, process.env.LOCAL_FRONTEND_URL],
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
		preflightContinue: true,
	})
)


/* Init passport */
app.use(passport.initialize())
app.use(passport.session())

/* Engine */

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(SRC_FOLDER, "./views"));



app.use('/api', rootRouter)

app.get('/', async (req, res) => {
	try {
		const countUser = await UserModel.countDocuments();
		if(countUser === 0){
			await res.render("home");
		}else{
			await res.render("redirectToClient");
		}

	}catch (e) {
		console.log("create website fail", e)
	}
})

app.post('/thank-you', async (req, res) => {
	const body = req.body;
	try {
		await createAdminServer(body);
		return res.render("thankyou");

	}catch (err){
		console.log('err', err);
		return  res.status(HttpStatusCode.BAD_REQUEST).json({
			message: "Create user fail!"
		})
	}
})

export default app