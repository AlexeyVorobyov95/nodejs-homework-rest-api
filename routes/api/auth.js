import { Router } from "express";
import { authenticate, validateBody } from "../../middlewares/index.js";
import { loginSchema, registerSchema, updateSubscriptionSchema } from "../../models/user.js";
import { controlUserFun } from "../../controllers/auth.js";

const router = Router();

router.post("/register", validateBody(registerSchema), controlUserFun.register);

router.post("/login", validateBody(loginSchema), controlUserFun.login);

router.get("/current", authenticate, controlUserFun.getCurrent);

router.post("/logout", authenticate, controlUserFun.logout);

router.patch("/:id/subscription", authenticate, validateBody(updateSubscriptionSchema), controlUserFun.changeSub);

export default router;
