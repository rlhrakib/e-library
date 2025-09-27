import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { updateUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  // validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);

router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.updateUser
);
// /api/v1/user/:id
export const UserRoutes = router;
