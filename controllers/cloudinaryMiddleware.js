import { cloudinary } from "../utils/cloudinary.js";

async function cloudinaryMiddleware(req, res, next) {
  if (!req.body.image)
    return res.status(404).json({ message: "Image not found!" });
    let title = '';
    title = req.body.title;
    title.replace(/[^a-zA-Z0-9 ]/g, '')
  try {
    await cloudinary.uploader.upload(
      req.body.image,
      { 
        folder: "posts",
        //optional
        upload_preset: "unsigned_preset",
        public_id: `/${title}-${Date.now()}`,
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        
      },
    )
    .then(result=> req.body.image = result.secure_url);

    next();
  } catch (error) {
    console.log(error);
  }
  
}
export { cloudinaryMiddleware };