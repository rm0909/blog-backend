import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 20 },
  email: { type: String, required: true, minLength: 8, maxLength: 30 },
  password: { type: String, required: true, minLength: 8, maxLength: 80 },
});
const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;
