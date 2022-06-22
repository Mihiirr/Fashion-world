import type { UploadHandler } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { unstable_createFileUploadHandler } from "@remix-run/node"; // or "@remix-run/cloudflare"
import fs from "fs";

export const standardFileUploadHandler = unstable_createFileUploadHandler({
  directory: "public/uploads",
});

export const fileUploadHandler: UploadHandler = (args) => {
  return standardFileUploadHandler(args);
};

export const deleteFileLocally = (fileName: string) => {
  const path = `public/uploads/${fileName}`;

  try {
    fs.unlinkSync(path);
    console.log("File Removed");
    //file removed
  } catch (err) {
    console.error(err);
  }
};
