import { Schema, model } from "mongoose";
import { IService } from "../../config/types";

const userSchema = new Schema<IService>({
  service: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  adressIP: {
    type: String,
    required: true,
  },
  status : {
    type: Number,
    required: true
  }
}, {
  collection : "services"
});

export default model<IService>("User", userSchema);
