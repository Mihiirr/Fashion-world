import type { UploadHandler } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { unstable_createFileUploadHandler } from "@remix-run/node"; // or "@remix-run/cloudflare"

export const standardFileUploadHandler = unstable_createFileUploadHandler({
  directory: "public/uploads",
});

export const fileUploadHandler: UploadHandler = (args) => {
  return standardFileUploadHandler(args);
};
