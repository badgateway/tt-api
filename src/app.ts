import { Application } from '@curveball/core';
import accessLog from '@curveball/accesslog';
import problem from '@curveball/problem';
import bodyParser from '@curveball/bodyparser';
import browser from '@curveball/browser';
import links from '@curveball/links';

import routes from './routes';

const app = new Application();

// The accesslog middleware shows all requests and responses on the cli.
app.use(accessLog());

app.use(browser());

// The problem middleware turns exceptions into application/problem+json error
// responses.
app.use(problem());

// The bodyparser middleware is responsible for parsing JSON and url-encoded
// request bodies, and populate ctx.request.body.
app.use(bodyParser());

// The links middleware parses links from HAL request bodies or
// HTTP Link headers, and makes them available in ctx.request.links
app.use(links());

app.use(...routes);

export default app;
