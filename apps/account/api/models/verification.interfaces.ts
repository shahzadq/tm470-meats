import { Document } from 'mongoose';

export interface IApiModelVerification extends Document {
  securityId: string;
  code: string;
  expiration: {
    code: Date;
    effect: Date;
  };
  used: boolean;
}
