import fs from 'fs';
import path from'path';
import logger from '../../config/logger.config.js';
import CustomError from '../utils/customError.js';

class FileHandleService {
    async uploadFile(req,fieldName, folderName, allowedTypes, maxSizeInMB = 2) {
        const destination = path.join(process.cwd(), 'public', 'uploads', folderName);
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        const files = [];

        if (!req.files || Object.keys(req.files).length === 0) {
            throw new CustomError(404, 'No file uploaded');
        }

        const uploadedFiles = Array.isArray(req.files[fieldName]) ? req.files[fieldName] : [req.files[fieldName]];

        for (const file of uploadedFiles) {
            const { name, size, data } = file;
            const ext = path.extname(name);
            const fileName = `${Date.now()}${ext}`;

            // Check allowed types
            if (!this.isAllowedFile(name, allowedTypes)) {
                throw new CustomError(400, `File type '${path.extname(name)}' is not allowed`);
            }

            // Check file size
            if (size > maxSizeInBytes) {
                throw new CustomError(400, `File size exceeds the maximum limit of ${maxSizeInMB} MB`);
            }

            const filePath = path.join(destination, fileName);

            await fs.promises.writeFile(filePath, data);

            files.push(fileName);
        }

        return files.length === 1 ? files[0] : files;
    }

    async removeFile(folderName, fileNames) {
        const destination = path.join(process.cwd(), 'public', 'uploads', folderName);
        const fileList = Array.isArray(fileNames) ? fileNames : [fileNames];

        for (const fileName of fileList) {
            const filePath = path.join(destination, fileName);

            try {
                await fs.promises.unlink(filePath);
                logger.info(`File ${filePath} removed successfully.`);
            } catch (error) {
                logger.error(`Error removing file ${filePath}: ${error.message}`);
            }
        }
    }

    isAllowedFile(fileName, allowedFileExtensions) {
        const fileExtension = path.extname(fileName).toLowerCase().replace(".", "");
        return allowedFileExtensions.includes(fileExtension);
    }
}

export default new FileHandleService();
