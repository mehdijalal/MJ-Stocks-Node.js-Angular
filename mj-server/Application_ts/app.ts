import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as errorhandler from 'errorhandler';
import * as cors from 'cors';
import { Router } from './routes/router';
import {LogErrors} from './public/common/logErrors.controller'
import { ServerConstants } from './public/common/envConstants';
var authMW = require ('./auth/auth-router');
/*
*-Note: I have added moment timezone and note used it yet
*- this moment timezone needs to be explored more later
*------
*/
var moment = require('moment-timezone');
moment().tz("America/Los_Angeles").format();

// This is the server's class.

// The server's class responsabilities are the following:

//  -   register the middleware.
//  -   initiate the routes, creates the server and listen on a port.
//  -   catch application's global errors and log them into the database. (dbo.LogErrors table.)

// The server uses Morgan logs as well and log the api calls into a file ("access.log").

class Server {
    
	private port:any;
    private app: any;    

    constructor() {

        let serverConstants = new ServerConstants();      

		this.port =  process.env.PORT || 5200;
        this.app = express();
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initRoutes();
        this.start();
    }

    start() {       
        this.app.use(this.logErrors)
        this.app.listen(this.port, (err: any) => {
            console.log('Listening on http://localhost:%d', process.env.NODE_ENV, this.port);
        });
    }

    logErrors(err, req, res, next) {

        if (err.stack) {
            console.error(err.stack);
            LogErrors.logErrors(err);
        }
               
        next(err);
    }
    
    initExpressMiddleWare() {

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.app.use(express.static(__dirname + '/public'));       
        //this.app.use(bodyParser.urlencoded({ extended: true }));
        //this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
        this.app.use(bodyParser.json({limit: '5mb'}));

        this.app.use(errorhandler());
        this.app.use(cookieParser());
        this.app.use(cors());

        LogErrors.cleanupErrors();
        //------once we remove the comment it will authenticate------//
        //this.app.use(authMW);

        process.on('uncaughtException', (err) => {
            if (err) 
            {
                LogErrors.logErrors(err);
            }
        });       
    }

    initCustomMiddleware() {
        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", () => {
                process.exit(1);
            });
        }

        process.on('SIGINT', () => {
         process.exit(1);
        });
    }   

    initRoutes() {
        (new Router()).load(this.app, './public/controllers');        
    }       
}

let server = new Server();