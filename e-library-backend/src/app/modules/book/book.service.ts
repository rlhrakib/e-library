/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import httpStatus from "http-status-codes";

const createBook = async (payload: Partial<IBook>) => {
  const isBookExist = await Book.findOne({ title: payload.title });
  if (isBookExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Book already exist");
  }
  const book = await Book.create(payload);
  return book;
};

// const updateBook = async (id: string, payload: Partial<IBook>) => {
//   const existingBook = await Book.findById(id);
//     console.log(existingBook);
//   if (!existingBook) {
//     throw new AppError(httpStatus.NOT_FOUND, "Book not found");
//   }
//   // 3️⃣ Check for duplicate title
//   if (payload.title && payload.title !== existingBook.title) {
//     const duplicateBook = await Book.findOne({
//       title: payload.title,
//       _id: { $ne: id },
//     });
//     if (duplicateBook) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         "A book with this title already exists"
//       );
//     }
//   }
//   const updatedBook = await Book.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return updatedBook;
// };

const updateBook = async (id: string, payload: Partial<IBook>) => {
  // console.log(payload);
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, "No update data provided");
  }

  const existingBook = await Book.findById(id);
  if (!existingBook) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }

  if (payload.title && payload.title !== existingBook.title) {
    const duplicateBook = await Book.findOne({
      title: payload.title,
      _id: { $ne: id },
    });
    if (duplicateBook) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "A book with this title already exists"
      );
    }
  }

  const updatedBook = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedBook;
};

const deleteBook = async (id: string) => {
  // console.log(id);
  await Book.findByIdAndDelete(id);
  return null;
};

const getSingleBook = async (id: string) => {
  const book = await Book.findById(id);
  //   console.log(book);

  return {
    data: book,
  };
};

const getAllBooks = async (query: Record<string, string>) => {
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "10");
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  // Build filter object
  const filter: Record<string, any> = {};
  if (query.category) {
    filter.category = query.category;
  }
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { author: { $regex: query.search, $options: "i" } },
    ];
  }

  const total = await Book.countDocuments(filter);

  const books = await Book.find(filter)
    .sort({ createdAt: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data: books,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const bookServices = {
  createBook,
  updateBook,
  deleteBook,
  getSingleBook,
  getAllBooks,
};
