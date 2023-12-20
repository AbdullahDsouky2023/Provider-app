import { Platform } from 'react-native';

export const uploadToStrapi = async (image, strapi_upload_url) => {
 try {
  const formData = new FormData();
  const uri = image; // from any library, you just need the file path

  formData.append("files", {
    name: `Nijk_IMAGE_ORDER`,
    type: "image/jpeg",
    uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
  });

  const response = await fetch(`${strapi_upload_url}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Image upload failed with status: ${response?.error}`);
  }

  const responseData = await response.json();
  const imageId = responseData[0]?.id;

  if (!imageId) {
    throw new Error("Image upload response did not contain an ID");
  }

  return imageId;
 } catch (error) {
  console.error("Error uploading image:", error);
  // return error;
 }
};
