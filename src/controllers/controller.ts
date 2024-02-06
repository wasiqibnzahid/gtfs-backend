import axios from "axios";
import { Handler } from "express";
const map: any = {};
export function getUrlData(url: string): Handler {
  return async (_req, res) => {
    if (map?.[url]) {
      res.send(map[url]);
      return;
    }
    const data = await axios
      .get(url, {
        onDownloadProgress(progressEvent) {
          console.log(progressEvent);
        },
      })
      .then((res) => res.data);
    map[url] = data;
    res.send(data);
  };
}
