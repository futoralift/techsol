import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      maxlength: [1000, 'Content cannot exceed 1000 characters'],
    },
    avatar: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

testimonialSchema.index({ isPublished: 1 });

const Testimonial: Model<ITestimonial> = mongoose.model<ITestimonial>(
  'Testimonial',
  testimonialSchema
);

export default Testimonial;
