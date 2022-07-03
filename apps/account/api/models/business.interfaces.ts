import { Document } from 'mongoose';
import {
  IApiModelCommonAddress,
  IApiModelCommonPhone,
} from './common.interfaces';

export interface IApiModelBusiness
  extends Document,
    IApiModelCommonAddress,
    IApiModelCommonPhone {
  name: string;
  securityId: string;
  phone: string;
  hours?: {
    open: string;
    close: string;
  };
}
