import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import tipoRobotRoute from './routes/tipoRobotRoute';
import robotRoute from "./routes/robotRoute";
import buildingRoute from "./routes/buildingRoute";
export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	tipoRobotRoute(app);
  robotRoute(app);
  buildingRoute(app);

	return app
}
