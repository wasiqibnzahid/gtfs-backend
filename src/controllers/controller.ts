import axios from "axios";
import { Handler } from "express";

export function getUrlData(url: string): Handler {
  return async (_req, res) => {
    const data = await axios
      .get(url, {
        onDownloadProgress(progressEvent) {
          console.log(progressEvent);
        },
      })
      .then((res) => res.data);
    res.send(data);
  };
}