import mongoose from "mongoose";
import connectMongo from "database/mongoConnect";
import Complaint from "../../models/complaintSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "GET") {
    let complaint = await Complaint.find({});
    console.log(complaint);
    res.status(200).json(complaint);
  }
}
