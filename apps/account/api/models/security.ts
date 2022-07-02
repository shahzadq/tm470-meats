import { model, Schema, Model, models } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IApiModelSecurity } from './security.interfaces';

const schema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'Security',
    timestamps: true,
  }
);

schema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      // if the password has already been modified
      return next();
    } else {
      this.password = await bcrypt.hash(this.password, 10);
      return next();
    }
  } catch (err: any) {
    return next(err);
  }
});

const security: Model<IApiModelSecurity> =
  models['security'] || model('security', schema);
export default security;
