import { Router } from "express";
import { controlFun } from "../../controllers/contacts.js";
import { validateBody, isValidId, authenticate } from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../models/contact.js";

const router = Router();

router.get("/", authenticate, controlFun.getAll);

router.get("/:id", authenticate, isValidId, controlFun.getById);

router.post("/", authenticate, validateBody(addSchema), controlFun.add);

router.delete("/:id", authenticate, isValidId, controlFun.del);

router.put("/:id", authenticate, isValidId, validateBody(addSchema), controlFun.update);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), controlFun.updateStatusContact);

export default router;
