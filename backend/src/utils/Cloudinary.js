import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./Api_Error.js";
import fs from "fs"


// Configuration


const Upload_On_Cloudinary = async (local_Path) => {
  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });
  
  try {
    if (!local_Path) return null;

    const response = await cloudinary.uploader.upload(local_Path, {
            resource_type: "auto"
        });

    fs.unlinkSync(local_Path)
    return response
  } catch (error) {
    fs.unlinkSync(local_Path) // remove the locally saved temporary file as the upload operation got failed
        return null;
  }
};



export { Upload_On_Cloudinary };
