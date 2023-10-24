import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import tipoRobotRoute from './routes/tipoRobotRoute';
import robotRoute from "./routes/robotRoute";

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	tipoRobotRoute(app);
  robotRoute(app)

	return app
}
