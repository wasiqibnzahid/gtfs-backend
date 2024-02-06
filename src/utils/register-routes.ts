import type { Express } from "express";
import { getUrlData } from "../controllers/controller";
import { config } from "dotenv";

config();
export const registerRoutes = (app: Express) => {
  app.get("/trip-update", getUrlData(process.env.TRIP_UPDATE_URL));
  app.get("/service-update", getUrlData(process.env.SERVICE_UPDATE_URL));
  app.get("/vehicle-positions", getUrlData(process.env.VEHICLE_POSITIONS_URL));
  app.get("/gtfs-static", getUrlData(process.env.GTFS_STATIC_URL));
};
