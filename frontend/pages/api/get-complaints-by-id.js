import Complaint from "models/complaintSchema";

export default async function handler(req, res) {
  console.log(req.body.id);
  const complaint = await Complaint.findById(req.body.id);
  console.log(complaint);
  res.send(complaint);
}
