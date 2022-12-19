import express from 'express';
import indexRouter from './routes/index';

const app = express();

app.use('/api', indexRouter);

export default app;
