import { Document } from 'mongoose';
import {
  IApiModelCommonAddress,
  IApiModelCommonPhone,
} from './common.interfaces';

export interface IApiModelPersonal
  extends Document,
    IApiModelCommonAddress,
    IApiModelCommonPhone {
  firstName: string;
  lastName: string;
  securityId: string;
}
