import { Document } from 'mongoose';

export type TApiModelSectionNameOptions =
  | 'chicken'
  | 'beef'
  | 'lamb'
  | 'mutton'
  | 'turkey'
  | 'goat'
  | 'seafood'
  | 'other';

export interface IApiModelSection extends Document {
  name: TApiModelSectionNameOptions;
  securityId: string;
}
