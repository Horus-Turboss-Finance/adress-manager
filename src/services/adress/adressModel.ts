import { Schema, model } from "mongoose";
interface IService {
  _id: string;
  service: string;
  port: number,
  adressIP: string,
  status: Number
}


const userSchema = new Schema<IService>({
  service: {
    type: String,
    required: true,
    index : true
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
