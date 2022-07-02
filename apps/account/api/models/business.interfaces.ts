import { Document } from 'mongoose';

export interface IApiModelBusiness extends Document {
  name: string;
  securityId: string;
}
