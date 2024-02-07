import axios from "axios";
import { Handler } from "express";
export function getUrlData(url: string): Handler {
  return async (_req, res) => {
    try {

      const data = await axios.get(url).then((res) => res.data);
      res.send(data);
    }
    catch(e) {
      res.status(500).send()
    }
  };
}
