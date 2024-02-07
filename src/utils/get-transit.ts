import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { createWriteStream } from "fs";

export const getTransit = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: process.env.GTFS_STATIC_URL,
      responseType: "stream",
      onDownloadProgress: (progress) => {
        console.log(
          "Downloading file, done: ",
          (progress.progress * 100).toFixed(2),
          " percent at rate: ",
          progress.rate / (1024 * 1024),
          " MB/s, loaded: ",
          progress.loaded / (1024 * 1024),
          "MBs total : ",
          progress.total / (1024 * 1024),
          " MBs"
        );
      },
    });

    const tempPath = path.join(
      __dirname,
      "../../static/google_transit_temp.zip"
    );
    const actualPath = path.join(__dirname, "../../static/google_transit.zip");

    try {
      await fs.unlink(tempPath);
    } catch (e) {}

    const writer = createWriteStream(tempPath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", async () => {
        try {
          await fs.unlink(actualPath);
        } catch (e) {}
        await fs.rename(tempPath, actualPath);
        setTimeout(getTransit, 1000 * 60 * 60 * 6);
        resolve(null);
      });
      writer.on("error", () => {
        setTimeout(getTransit, 1000 * 60 * 5);
        reject();
      });
    });
  } catch (e) {
    console.error("FAILED to load file", e)
    setImmediate(getTransit);
  }
};
