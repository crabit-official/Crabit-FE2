import { createMiddleware } from '@mswjs/http-middleware';
import cors from 'cors';
import express from 'express';

import { handlers } from '@/shared/mocks/handler';

const app = express();
const port = 8080;

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(express.json());
app.use(createMiddleware(...handlers));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
