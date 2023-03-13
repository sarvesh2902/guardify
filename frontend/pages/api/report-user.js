import reportedUser from "models/reportedUser";

export default async function handler(req, res) {
  const user = new reportedUser(req.body);
  user.save();
  // console.log(req.body.user);
  res.send("ok");
}
