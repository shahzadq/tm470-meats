import { Document } from 'mongoose';

export interface IApiModelPersonal extends Document {
  firstName: string;
  lastName: string;
  securityId: string;
}
