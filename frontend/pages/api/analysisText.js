import mongoose from "mongoose";
import connectMongo from "database/mongoConnect";
import Complaint from "../../models/complaintSchema";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

 if (req.method === "POST") {
    const formData = req.body;
    const user = new Complaint(formData);
    await user.save();
    res.send(user);
  }
}
