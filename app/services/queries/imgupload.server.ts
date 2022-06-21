import sharp from "sharp";

export const imageUpload = (image: any) => {
  sharp(image)
    .resize(252, 379)
    .toFile("upload/prod-img/image.webp", (err, info) => {
      if (err) {
        console.log({ err });
      } else {
        console.log({ info });
      }
    });
};
