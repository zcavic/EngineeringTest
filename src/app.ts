import express, { Application, Request, Response, NextFunction } from 'express';

const app: express.Application = express();

const add = (a: number, b: number): number => a + b;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is message from server.')
});

app.listen(3001, () => console.log('Server is running.'))