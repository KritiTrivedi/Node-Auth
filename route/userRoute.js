import  express  from 'express';

import { create, login, findAll} from '../controller/userController.js';
import { auth } from '../middelwere/auth.js';

const routes = express.Router();

routes.post("/",create);
routes.post("/authorization",login);
routes.get("/findAll",auth,findAll);

export default routes;