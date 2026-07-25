import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  client?: string;
  technologies: string[];
  images: string[];
  featuredImage?: string;
  liveUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
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
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

projectSchema.index({ slug: 1 });
projectSchema.index({ isPublished: 1, isFeatured: 1 });

const Project: Model<IProject> = mongoose.model<IProject>('Project', projectSchema);

export default Project;
