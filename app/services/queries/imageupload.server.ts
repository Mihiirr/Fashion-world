import multer from "multer";
import Multer from "multer";
import path from "path";

export const ImageUpload = async (fileName: string) => {
  const Storage = await Multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      console.log("hello world");
      console.log("Image Upload function: " + file);
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = await multer({ storage: Storage });
  await upload.single(fileName);
};
