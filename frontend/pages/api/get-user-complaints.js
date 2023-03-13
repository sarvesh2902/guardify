import axios from "axios";
import Complaint from "models/complaintSchema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.email);
    const complaint = await Complaint.find({ email: req.body.email });
    console.log(complaint);
    res.send(complaint);
  }
}
