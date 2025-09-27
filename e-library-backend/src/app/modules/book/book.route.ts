import { Router } from "express";
import { bookControllers } from "./book.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

// Create a new book (only SUPER_ADMIN or ADMIN)
router.post(
  "/create",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  bookControllers.createBook
);

// Update an existing book by ID (only SUPER_ADMIN or ADMIN)
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  bookControllers.updateBook
);

// Delete a book by ID (only SUPER_ADMIN or ADMIN)
router.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  bookControllers.deleteBook
);

// Get all books with optional filters, search, sort, pagination
router.get("/all-books", bookControllers.getAllBooks);

// Get a single book by MongoDB ID
router.get("/:id", bookControllers.getSingleBook);

export const BookRoutes = router;
