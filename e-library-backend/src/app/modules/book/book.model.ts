import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    copiesAvailable: { type: Number, required: true, min: 0 },
    imageURL: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Book = model<IBook>("Book", bookSchema);
