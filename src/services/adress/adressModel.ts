import { isValidIP } from "checks";
import { Schema, model } from "mongoose";
import { serviceName } from "params";
interface IService {
  _id: string;
  service: string;
  port: number,
  adressIP: string,
  status: Number
}

const servicesSchema = new Schema<IService>({
  service: {
    type: String,
    required: [true, "Service required"],
    index : true,
    enum: {
      values: serviceName,
      message: '{VALUE} is not a supported service'
    }
  },
  port: {
    type: Number,
    required: [true, "Port required"],
  },
  adressIP: {
    type: String,
    required: [true, "IP required"],
    validate : {
      validator: (v) => isValidIP(v)
    }
  },
  status : {
    type: Number,
    required: [true, "Status required"],
    enum : [0, 1, 2],
    default : 1
  }
}, {
  collection : "services"
});

export default model<IService>("services", servicesSchema);
