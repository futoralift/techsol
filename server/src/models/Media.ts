import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IMedia extends Document {
  publicId: string;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    publicId: {
      type: String,
      required: [true, 'Public ID is required'],
      unique: true,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
    },
    filename: {
      type: String,
      required: [true, 'Filename is required'],
      trim: true,
    },
    mimetype: {
      type: String,
      required: [true, 'Mimetype is required'],
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
      min: 0,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploader is required'],
    },
  },
  { timestamps: true }
);

mediaSchema.index({ uploadedBy: 1, createdAt: -1 });

const Media: Model<IMedia> = mongoose.model<IMedia>('Media', mediaSchema);

export default Media;
