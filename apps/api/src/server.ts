import config from './config';

import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { router, createContext } from '@curious/trpc';

const app = express();

app.use(cors(config.cors));
app.use((req, _, next) => {
   console.log(req.method, req.path, req.body ?? req.query);
   next();
});

app.use(
   '/',
   createExpressMiddleware({
      router,
      createContext,
   })
);

app.listen(config.port, () => console.log(`listening on :${config.port}`));
