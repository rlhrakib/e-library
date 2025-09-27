import express from "express";
import { borrowControllers } from "./borrow.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.post(
  "/create-borrow",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  borrowControllers.createBorrow
);

router.get(
  "/all-borrows",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  borrowControllers.getAllBorrowingHistory
);

router.get(
  "/my-borrows",
  checkAuth(...Object.values(Role)),
  borrowControllers.getBorrowingHistoryByUser
);

router.patch(
  "/:borrowId",
  checkAuth(...Object.values(Role)),
  borrowControllers.updateBorrowStatus
);

export const borrowRoutes = router;
