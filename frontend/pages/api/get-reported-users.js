import reportedUser from "models/reportedUser";

export default async function handler(req, res) {
  const user = await reportedUser.find({});
  console.log(user);
  res.send(user);
}
