import { model, Schema } from "mongoose";
import { BorrowStatus, IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    dueDate: { type: Date, required: true },
    returnedAt: { type: Date },
    status: {
      type: String,
      enum: Object.values(BorrowStatus),
      default: BorrowStatus.BORROWED,
    },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
