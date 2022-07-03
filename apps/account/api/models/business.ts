import { model, Schema, Model, models } from 'mongoose';

import { IApiModelBusiness } from './business.interfaces';

const schema: Schema = new Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
    },
    securityId: {
      type: Schema.Types.ObjectId,
      ref: 'Security',
      required: true,
    },
    address: {
      number: {
        type: Number,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    hours: {
      open: {
        type: String,
      },
      close: {
        type: String,
      },
    },
  },
  {
    collection: 'Business',
    timestamps: true,
  }
);

const business: Model<IApiModelBusiness> =
  models['business'] || model('business', schema);
export default business;
