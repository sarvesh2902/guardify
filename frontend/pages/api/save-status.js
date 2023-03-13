import Complaint from "models/complaintSchema";

export default async function handler(req, res) {
  console.log(req.body);
  const complaint = await Complaint.findOneAndUpdate(
    { _id: req.body.complaintId },
    { status: req.body.status }
  );
  res.send("success");
}
