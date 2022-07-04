import { model, Model, models, Schema } from 'mongoose';
import { IApiModelItem } from './item.interfaces';

const schema: Schema = new Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Sections',
      required: true,
    },
  },
  {
    collection: 'Items',
    timestamps: true,
  }
);

const item: Model<IApiModelItem> = models['item'] || model('item', schema);
export default item;
