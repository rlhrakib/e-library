import { Types } from "mongoose";

export enum BorrowStatus {
  BORROWED = "borrowed",
  RETURNED = "returned",
}

export interface IBorrow {
  userId: Types.ObjectId;   
  bookId: Types.ObjectId;   
  dueDate: Date;
  returnedAt?: Date;
  status: BorrowStatus;
  quantity: number;
}
