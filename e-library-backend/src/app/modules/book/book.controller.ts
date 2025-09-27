/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { bookServices } from "./book.service";

const createBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const book = await bookServices.createBook(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Book Created Successfully",
      data: book,
    });
  }
);

const updateBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const book = await bookServices.updateBook(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book updated successfully",
      data: book,
    });
  }
);

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookServices.deleteBook(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book is deleted",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await bookServices.getAllBooks(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "books retrieved",
    data: result.data,
    meta: result.meta,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await bookServices.getSingleBook(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "books retrieved",
    data: result.data,
  });
});

export const bookControllers = {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
};
