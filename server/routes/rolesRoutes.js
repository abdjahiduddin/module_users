import { Router } from "express";
import indexController from "../controllers/indexController";

const router = Router();

router.get("/", indexController.rolesController.findAll);

export default router;
