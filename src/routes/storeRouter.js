import { Router } from "express";
import { fromData } from "../configuration/config.js";
import {
  addStore,
  getStore,
  getSingleStore,
} from "../controller/storeController.js";

const storeRouter = Router();

storeRouter.get("/getStore", getStore);
storeRouter.post("/addStore", fromData, addStore);
storeRouter.get("/getSingleStore/:id", getSingleStore);
export default storeRouter;
