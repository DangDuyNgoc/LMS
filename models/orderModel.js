import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    paymentInfo: {
      type: Object,
    },
  },
  { timestamps: true }
);


const orderModel = mongoose.model("order", orderSchema);

export default orderModel;