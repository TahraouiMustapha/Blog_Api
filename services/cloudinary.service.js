const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true
});

console.log(cloudinary.config());

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_posts" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        stream.end(fileBuffer);
    });
};

module.exports = {
    uploadToCloudinary
}