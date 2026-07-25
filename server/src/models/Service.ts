import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ slug: 1 });
serviceSchema.index({ isActive: 1, order: 1 });

const Service: Model<IService> = mongoose.model<IService>('Service', serviceSchema);

export default Service;
