import { Router } from "express";
import indexController from "../controllers/indexController";

const router = Router();

router.get("/", indexController.usersEducationController.findAll);

export default router;
