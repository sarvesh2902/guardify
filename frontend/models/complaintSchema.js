import { Schema, model, models } from "mongoose";

const ComplaintSchema = new Schema({
  subject: String,
  name: String,
  address: String,
  city: String,
  code: Number,
  phone: Number,
  complaint: String,
  email: String,
  reportedName: String,
  status: {
    type: String,
    default: "In Progress",
  },
});

const Complaint = models.Complaint || model("Complaint", ComplaintSchema);

export default Complaint;
