import multer from "multer";
import {unlink} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import { createError } from "./CreateError";

const file_name = function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '.jpg')
}

// TODO: Required fields must be check;
const filtering = function (req, file, cb) {
    const allowed_image_mime = ['image/jpeg', 'image/png', 'image/gif'];
    const allowed_image_extensions = ['png', 'jpeg', 'jpg'];

    const extensions = file.originalname.split('.')
    
    if (!allowed_image_extensions.includes(extensions[extensions.length - 1].trim()))
        return cb(new Error('This extensions is not allowed.'))
    if (!allowed_image_mime.includes(file.mimetype))
        return cb(new Error('This file format is not allowed.'))
    if (file.size > 1024*3)
        return cb(new Error('The size is too big'))
    cb(null, true)

}

const __dirname = import.meta.dirname;

const storage = multer.diskStorage({
    filename: file_name,
    destination: __dirname+'/../uploads',
});
const uploader = multer({
    storage,
    fileFilter: filtering
});

export const removeImage = async (path) => {
    try {
        if (!existsSync(path))
            throw createError(400, "File not found")
        return unlink(path);   
    } catch (error) {
        throw error
    }
} 

export default uploader