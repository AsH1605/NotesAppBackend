import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.route';
import { setupDBConnection } from './db/db';

const startServer = async() => {
    console.log("Starting server")

    await setupDBConnection();

    const app = express();

    app.use('/users', userRouter);

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