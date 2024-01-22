import mongoose from "mongoose";

const Schema = mongoose.Schema

const watchSchema = new Schema ({
  brand: {type: String, required: true},
  style: {type: String, required: true},
  movement: {type: String, required: true},
  functionality: {type: String, required: true},
  features: {type: String, required: false},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}. {
  timestamps: true
})

const Watch = mongoose.model('Watch', watchSchema)

export {
  Watch
}