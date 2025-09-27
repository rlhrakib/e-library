/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { borrowServices } from "./borrow.service";
import { BorrowStatus } from "./borrow.interface";

const createBorrow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bookId, quantity, dueDate } = req.body;
    const userId = (req.user as any).userId; // coming from JWT payload

    // Construct payload
    const payload = {
      userId,
      bookId,
      quantity,
      dueDate,
      status: BorrowStatus.BORROWED, // default status
    };

    const borrow = await borrowServices.createBorrow(payload);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Book borrowed successfully",
      data: borrow,
    });
  }
);

// Get all borrowing history (Admin only)
const getAllBorrowingHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await borrowServices.getAllBorrowingHistory();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All borrowing history retrieved successfully",
      data: result,
    });
  }
);

// Get borrowing history for a specific user
const getBorrowingHistoryByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).userId;
    const result = await borrowServices.getBorrowingHistoryByUser(userId);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User borrowing history retrieved successfully",
      data: result,
    });
  }
);

const updateBorrowStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { borrowId } = req.params; // borrow record id
    const { status } = req.body; // new status (borrowed, returned, overdue)

    const result = await borrowServices.updateBorrowStatus(borrowId, status);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Borrow status updated successfully",
      data: result,
    });
  }
);

export const borrowControllers = {
  getAllBorrowingHistory,
  getBorrowingHistoryByUser,
  updateBorrowStatus,
  createBorrow,
};
