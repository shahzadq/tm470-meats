import { Document } from 'mongoose';

export interface IApiModelSecurity extends Document {
  email: string;
  password: string;
  verified: boolean;
}
