export interface IBook {
  title: string;
  author: string;
  category: string;
  publishedYear: number;
  copiesAvailable: number;
  imageURL: string;
  description?: string;
}
