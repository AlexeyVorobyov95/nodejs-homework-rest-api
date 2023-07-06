import { Router } from "express";
import { authenticate, upload, validateBody } from "../../middlewares/index.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  updateSubscriptionSchema,
} from "../../models/user.js";
import { controlUserFun } from "../../controllers/auth.js";

const router = Router();

router.post("/register", validateBody(registerSchema), controlUserFun.register);

router.get("/verify/:verificationToken", controlUserFun.verifyEmail);

router.post(
  "/verify",
  validateBody(emailSchema),
  controlUserFun.resendVerifyEmail
);

router.post("/login", validateBody(loginSchema), controlUserFun.login);

router.get("/current", authenticate, controlUserFun.getCurrent);

router.post("/logout", authenticate, controlUserFun.logout);

router.patch(
  "/:id/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  controlUserFun.changeSub
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controlUserFun.updateAvatar
);

export default router;
