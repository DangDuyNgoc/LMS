import mongoose from "mongoose";
import courseDataSchema from "./courseDataSchema.js";
import reviewSchema from "./reviewModel.js";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    categories: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      require: true,
    },
    demoUrl: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    courseData: [courseDataSchema],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const coursesModel = mongoose.model("courses", courseSchema);
export default coursesModel;
