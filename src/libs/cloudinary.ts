import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import { promisify } from "util";
import * as fs from "fs";

cloudinary.config({
  cloud_name: "dhneingic",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
const writeFileAsync = promisify(fs.writeFile);
export async function CloudinaryUpload(base64: string) {
  try {
    const imageBuffer = Buffer.from(base64, "base64");
    const resizeBuffer = await sharp(imageBuffer).toBuffer();
    const tempFilePath = "temp-image.jpg";
    await writeFileAsync(tempFilePath, resizeBuffer);

    const result = await cloudinary.uploader.upload(tempFilePath);

    fs.unlinkSync(tempFilePath);

    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
}
