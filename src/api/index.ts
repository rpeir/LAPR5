import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import robotRoute from "./routes/robotRoute";
import robotTypeRoute from "./routes/robotTypeRoute";

import buildingRoute from "./routes/buildingRoute";
import floorRoute from "./routes/floorRoute";
import elevatorRoute from "./routes/elevatorRoute";
import pathwayRoute from "./routes/pathwayRoute";
import roomRoute from "./routes/roomRoute";
export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
  robotTypeRoute(app);
  robotRoute(app);
  buildingRoute(app);
  floorRoute(app);
  elevatorRoute(app);
  pathwayRoute(app);
  roomRoute(app);

	return app
}
