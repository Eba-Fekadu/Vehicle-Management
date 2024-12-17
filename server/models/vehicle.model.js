import mongoose from "mongoose"

const vehicleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Vehicle = mongoose.model("Vehicle", vehicleSchema)

export default Vehicle
