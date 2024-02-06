import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { createWriteStream } from "fs";

export const getTransit = async () => {
  const response = await axios({
    method: "GET",
    url: process.env.GTFS_STATIC_URL,
    responseType: "stream",
  });

  const tempPath = path.join(__dirname, "../../static/google_transit_temp.zip");
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
};
