import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.all("/", async (req, res) => {
  try {
    let response;
    const { host, ...headers } = req.headers;
    if (req.method === "GET") {
      response = await fetch(
        `${process.env.HANSEN_CPQ_API_ROOT}${req.originalUrl}`,
        {
          method: req.method,
          headers: { host: process.env.HANSEN_CPQ_HOST, ...headers },
          port: 80,
        }
      );
    } else {
      response = await fetch(
        `${process.env.HANSEN_CPQ_API_ROOT}${req.originalUrl}`,
        {
          method: req.method,
          body: JSON.stringify(req.body),
          headers: { host: process.env.HANSEN_CPQ_HOST, ...headers },
          port: 80,
        }
      );
    }

    if (response.status >= 400) {
      const error = new Error(response.statusText);
      error.status = response.status;
      error.body = await response.text();
      throw error;
    }
    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status).send(error.body || error.message);
  }
});

export default router;
