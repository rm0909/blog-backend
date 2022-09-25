import { cloudinary } from "../utils/cloudinary.js";

async function cloudinaryMiddleware(req, res, next) {
  if (!req.body.image)
    return res.status(404).json({ message: "Image not found!" });
  try {
    await cloudinary.uploader.upload(
      req.body.image,
      {
        folder: "posts",
        //optional
        upload_preset: "unsigned_preset",
        public_id: `/${req.body.title}-${Date.now()}`,
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
      },
      (err, result) => {
        if (err) console.log(err);
        if ( res.body.secure_url && res.body.secure_url !== '' ) return req.body.image = result
        console.log(result)
      }
    );
    next();
  } catch (error) {
    console.log(error);
  }
  
}
export { cloudinaryMiddleware };