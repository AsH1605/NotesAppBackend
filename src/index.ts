import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.route';
import { setupDBConnection } from './db/db';
import { noteRouter } from './routes/note.route';

const startServer = async() => {
    console.log("Starting server")

    await setupDBConnection();

    const app = express();

    app.use('/users', userRouter);
    app.use('/notes', noteRouter);

    const port = process.env.PORT || 3000;

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, TypeScript Express!');
    });
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

startServer().then(() => {
    console.log("Server started sucessfully")
}).catch(error => {
    console.log("Server failed to start ", error)
})