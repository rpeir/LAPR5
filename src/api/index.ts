import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import robotRoute from "./routes/robotRoute";
import robotTypeRoute from "./routes/robotTypeRoute";

import buildingRoute from "./routes/buildingRoute";
export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
  robotTypeRoute(app);
  robotRoute(app);
  buildingRoute(app);

	return app
}
