const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true
});

console.log(cloudinary.config());


const uploadImage = async (imagePath) => {

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        // {secure_url
        // url 
        // public_id 
        // asset_id 
        // version }
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    uploadImage
}