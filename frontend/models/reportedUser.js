import { Schema, model, models } from "mongoose";

const reportedUserSchema = new Schema({
  username: String,
});

const reportedUser =
  models.reportedUser || model("reportedUser", reportedUserSchema);

export default reportedUser;
