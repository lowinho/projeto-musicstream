import express, {RequestHandler} from 'express';

import "./database";
import { routes } from "./routes";
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json() as RequestHandler);
app.use(routes);

app.listen(3333, () => console.log('Server is running on port 3333'));

