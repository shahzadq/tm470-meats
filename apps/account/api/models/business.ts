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
  },
  {
    collection: 'Business',
    timestamps: true,
  }
);

const business: Model<IApiModelBusiness> =
  models['business'] || model('business', schema);
export default business;
