import { model, Schema, Model, models } from 'mongoose';

import { IApiModelVerification } from './verification.interfaces';

const schema: Schema = new Schema(
  {
    securityId: {
      type: Schema.Types.ObjectId,
      ref: 'Security',
      required: true,
      unqiue: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiration: {
      code: {
        type: Date,
        default: Date.now() + 300000, // 5 mins
      },
      effect: {
        type: Date,
        default: Date.now() + 600000, // 10 mins
      },
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'Verification',
    timestamps: true,
  }
);

const verification: Model<IApiModelVerification> =
  models['verification'] || model('verification', schema);
export default verification;
