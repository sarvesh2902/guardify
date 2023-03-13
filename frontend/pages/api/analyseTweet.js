import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const token = "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";

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        "https://api-inference.huggingface.co/models/ikram54/autotrain-harassement-675420038",
        data,
        config
      )
      .then(function (response) {
        console.log(response);
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
