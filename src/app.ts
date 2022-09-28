import accessLog from '@curveball/accesslog';
import bodyParser from '@curveball/bodyparser';
import browser from '@curveball/browser';
import links from '@curveball/links';
import problem from '@curveball/problem';
import validator from '@curveball/validator';
import { Application } from '@curveball/core';
import cors from '@curveball/cors';

import * as path from 'path';

import routes from './routes';

const app = new Application();

// The accesslog middleware shows all requests and responses on the cli.
app.use(accessLog());

// app.use(accessLog([
//   '/health',
//   '/favicon.ico',
// ]));

app.use(browser());

// app.use(halBrowser({
//   title: 'Underknown Media API',
//   navigationLinks: {
//     export: {
//       defaultTitle: 'Export',
//       position: 'header',
//       showLabel: true,
//       icon: 'icon/down.svg',
//     },
//   }
// }));

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
  allowOrigin: [
    'http://localhost:8902',
    'http://127.0.0.1:8902',
  ]
}));
// app.use(
//   cors({
//     allowHeaders: [
//       "X-Filename",
//       "Content-Type",
//       "User-Agent",
//       "Authorization",
//       "Accept",
//       "Prefer",
//       "Prefer-Push",
//       "Link",
//     ],
//   })
// );

// The validator middleware lets users easily validate request bodies
// using JSON-Schema
app.use(validator({
  schemaPath: path.join(__dirname, '../node_modules/@badgateway/tt-types/schema')
}));

// const authApi = process.env.AUTH_API_URI || 'https://auth.underknown.com'; http://localhost:8531
// const tokenEndpoint = new URL('/token', authApi);
// const introspectionEndpoint = new URL('/introspect', authApi);
// const authorizationEndpoint = new URL('/authorize', authApi);

// const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8505;

// const client = new OAuth2Client({
//   clientId: process.env.OAUTH2_CLIENT_ID || 'tt-api',
//   tokenEndpoint: tokenEndpoint.toString(),
//   introspectionEndpoint: introspectionEndpoint.toString(),
//   authorizationEndpoint: authorizationEndpoint.toString(),
// });

// app.use(browserToBearer({client}));

// app.use(oauth2({
//   client,
//   publicPrefixes: [
//     '/health',
//   ],
// }));

// app.use(authenticatedAs());

app.use(...routes);

export default app;
