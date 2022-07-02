import { model, Schema, Model, models } from 'mongoose';

import { IApiModelPersonal } from './personal.interfaces';

const schema: Schema = new Schema(
  {
    firstName: {
      type: String,
      maxlength: 50,
      required: true,
    },
    lastName: {
      type: String,
      maxlength: 50,
      required: true,
    },
    securityId: {
      type: Schema.Types.ObjectId,
      ref: 'Security',
      required: true,
      unqiue: true,
    },
  },
  {
    collection: 'Personal',
    timestamps: true,
  }
);

const personal: Model<IApiModelPersonal> =
  models['personal'] || model('personal', schema);
export default personal;
