import { model, Schema, Model, models } from 'mongoose';
import { IApiModelSection } from './section.interfaces';

const schema: Schema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    securityId: {
      type: Schema.Types.ObjectId,
      ref: 'Security',
      required: true,
    },
  },
  {
    collection: 'Sections',
    timestamps: true,
  }
);

const section: Model<IApiModelSection> =
  models['section'] || model('section', schema);
export default section;
