import mongoose, { Types } from "mongoose";
import { BorrowStatus, IBorrow } from "./borrow.interface";
import { Borrow } from "./borrow.model";
import { User } from "../user/user.model";
import { IsActive } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Book } from "../book/book.model";

/**
 * Create a new borrow entry
 */
const createBorrow = async (payload: IBorrow) => {
  const userId = payload.userId;
  const user = await User.findById(userId);
  if (user?.isActive === IsActive.BLOCKED) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "User is blocked and cannot borrow books"
    );
  }

  if (payload.quantity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Quantity must be greater than 0"
    );
  }

  if (new Date(payload.dueDate) <= new Date()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Due date must be in the future"
    );
  }

  const bookId = payload.bookId;
  const book = await Book.findById(bookId);
  if (book?.copiesAvailable === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No copies available for this book"
    );
  }

  const updatedCopies =
    book && typeof book.copiesAvailable === "number"
      ? book.copiesAvailable - payload.quantity
      : 0;

  if (updatedCopies < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Requested quantity exceeds available copies"
    );
  }

  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId, copiesAvailable: { $gte: payload.quantity } },
    { $inc: { copiesAvailable: -payload.quantity } },
    { new: true }
  );
  if (!updatedBook) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Requested quantity exceeds available copies"
    );
  }

  const borrow = new Borrow(payload);
  return await borrow.save();
};

/**
 * Get all borrowing history (admin use)
 */
const getAllBorrowingHistory = async () => {
  return await Borrow.find()
    .select("userId bookId quantity status dueDate returnedAt")
    .populate("userId", "name email")
    .populate("bookId", "title author")
    .sort({ dueDate: -1 });
};

/**
 * Get borrowing history of a specific user
 */
const getBorrowingHistoryByUser = async (userId: string | Types.ObjectId) => {
  return await Borrow.find({ userId: new Types.ObjectId(userId) })
    .populate("bookId", "title author status dueDate returnedAt")
    .sort({ dueDate: -1 });
};

/**
 * Update borrow status (e.g., return a book)
 */

const updateBorrowStatus = async (
  borrowId: string,
  status: Partial<IBorrow>["status"]
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const borrow = await Borrow.findById(borrowId).session(session);
    if (!borrow) throw new AppError(404, "Borrow record not found");

    // Check if the status is changing
    if (borrow.status === status) {
      await session.endSession();
      return borrow; // no change
    }

    const book = await Book.findById(borrow.bookId).session(session);
    if (!book) throw new AppError(404, "Book not found");

    // If returning the book, increment copiesAvailable
    if (
      status === BorrowStatus.RETURNED &&
      borrow.status !== BorrowStatus.RETURNED
    ) {
      book.copiesAvailable += borrow.quantity;
    }

    // If changing from RETURNED back to BORROWED, decrement copiesAvailable
    if (
      borrow.status === BorrowStatus.RETURNED &&
      status === BorrowStatus.BORROWED
    ) {
      if ((book.copiesAvailable ?? 0) < borrow.quantity) {
        throw new AppError(
          400,
          "Not enough copies available to revert status to BORROWED"
        );
      }
      book.copiesAvailable -= borrow.quantity;
    }

    // Save the book and borrow inside the transaction
    await book.save({ session });

    borrow.status = status as BorrowStatus;
    if (status === BorrowStatus.RETURNED) borrow.returnedAt = new Date();

    await borrow.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return borrow;
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const borrowServices = {
  createBorrow,
  getAllBorrowingHistory,
  getBorrowingHistoryByUser,
  updateBorrowStatus,
};
