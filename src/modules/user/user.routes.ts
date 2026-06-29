import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth.middleware"
import authorize from "../../middlewares/role.middleware";

const router = Router();

router.get( "/members", auth,authorize("manager"),UserController.getAllMembers);

export default router;