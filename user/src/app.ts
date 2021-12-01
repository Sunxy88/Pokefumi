import express from 'express'
import * as routes from './routes'

var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express()
 
app.use(cookieParser('login_session'));
app.use(session({
 secret: 'login_session',
 resave: true,
 saveUninitialized:true
}));

app.use(express.json())
routes.register(app)

export {app};
