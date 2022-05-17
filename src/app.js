import {Router} from "express";
import * as authController from "./controllers/authController.js";
import * as userController from "./controllers/userController.js";
import validateToken from "./middlewares/authMiddleware.js";

const routes = Router();
routes.post("/sign-up", authController.cadastro);
routes.post("/sign-in", authController.login);
routes.get("/list-users", userController.showUsers, validateToken);

export default routes;
