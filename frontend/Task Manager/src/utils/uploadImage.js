import { API_PATHS } from './apiPath';
import axiosInstance from './axiosInstance';

export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  // Append imageFile to form data
  formData.append('image', imageFile);
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'application/form-data', //Set header for file upload
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error uploading the image', err);
    throw err; //Rethrow error for handling
  }
};
