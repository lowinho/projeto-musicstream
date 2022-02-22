import { Router } from "express";
import { loginRoutes } from "./routes/loginRoutes";
import { authorRoutes } from "./routes/authorRoutes";
import { genreRoutes } from "./routes/genreRoutes";
import { musicRoutes } from "./routes/musicRoutes";
import { mylistRoutes } from "./routes/myListRoutes";
import { avatarRoutes } from "./routes/avatarRoutes";

import { userRoutes } from "./routes/userRoutes";

// import { checkJwt } from "./middleware/auth";

const routes = Router();

// routes.use(checkJwt);
routes.use('/login', loginRoutes);
routes.use('/author', authorRoutes);
routes.use('/genre', genreRoutes);
routes.use('/avatar', avatarRoutes);
routes.use('/user', userRoutes);
routes.use('/mylist', mylistRoutes);
routes.use('/music', musicRoutes);

export { routes };