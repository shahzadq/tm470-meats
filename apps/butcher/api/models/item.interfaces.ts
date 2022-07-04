import { Document } from 'mongoose';

export interface IApiModelItem extends Document {
  name: string;
  price: number;
  description: string;
  sectionId: string;
}
