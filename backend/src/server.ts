import express, {RequestHandler} from 'express';

import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.json() as RequestHandler);

app.use(routes);

app.listen(3333, () => console.log('Server is running on port 3333'));

