import { supabase } from '../../config/supabase';
import { AppError } from '../../utils/AppError';
import httpStatus from 'http-status';

/**
 * Uploads a file to a specified Supabase Storage bucket.
 * @param {Buffer} fileBuffer - The buffer of the file to upload.
 * @param {string} fileName - The desired name for the file in the bucket.
 * @param {string} bucketName - The name of the Supabase Storage bucket.
 * @returns {Promise<string>} The public URL of the uploaded file.
 */
export const uploadFileToStorage = async (
    fileBuffer: Buffer,
    fileName: string,
    bucketName: string
): Promise<string> => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, fileBuffer, {
            upsert: true, // Overwrite file if it exists
        });

    if (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `File upload failed: ${error.message}`);
    }

    // Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(data.path);

    return urlData.publicUrl;
};