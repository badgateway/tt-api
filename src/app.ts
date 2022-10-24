import * as dotenv from 'dotenv';
dotenv.config();

import accessLog from '@curveball/accesslog';
import bodyParser from '@curveball/bodyparser';
import browser from '@curveball/browser';
import links from '@curveball/links';
import problem from '@curveball/problem';
import validator from '@curveball/validator';
import { Application } from '@curveball/core';
import cors from '@curveball/cors';
import session from '@curveball/session';
import browserToBearer from '@curveball/browser-to-bearer';
import oauth2 from '@curveball/oauth2';
import oauth2Client from './oauth2';

import * as path from 'path';
import routes from './routes';

const app = new Application();

// The accesslog middleware shows all requests and responses on the cli.
app.use(accessLog());

app.use(browser({ title: 'Time Tracker API' }));

app.use(session({
  store: 'memory',
  expiry: 3600 * 6,
  cookieOptions: {
    httpOnly: true,
    sameSite: false,
    path: '/'
  },
}));

// The problem middleware turns exceptions into application/problem+json error
// responses.
app.use(problem());

// The bodyparser middleware is responsible for parsing JSON and url-encoded
// request bodies, and populate ctx.request.body.
app.use(bodyParser());

// The links middleware parses links from HAL request bodies or
// HTTP Link headers, and makes them available in ctx.request.links
app.use(links());

app.use(cors({
  allowOrigin: ['*']
}));

// The validator middleware lets users easily validate request bodies
// using JSON-Schema
app.use(validator({
  schemaPath: path.join(__dirname, '../node_modules/@badgateway/tt-types/schema')
}));


app.use(browserToBearer({
  client: oauth2Client,
}));

app.use(oauth2({
  publicPrefixes: [
    '/health',
  ],
  client: oauth2Client,
}));


app.use(...routes);

export default app;
