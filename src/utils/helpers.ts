import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config";

export const uploadPhotoToStorage = async (
	photoUri: string
): Promise<string> => {
	try {
		if (!photoUri) throw new Error("Photo URI is required");

		// Extract file name
		const fileName = photoUri.split("/").pop();

		// Create storage reference
		const storageRef = ref(storage, `posts/${fileName}`);

		// Fetch the file as a blob
		const response = await fetch(photoUri);
		if (!response.ok) {
			throw new Error(`Failed to fetch file: ${response.statusText}`);
		}
		const blob = await response.blob();

		// Upload file

		try {
			const result = await uploadBytes(storageRef, blob);
		} catch (uploadError) {
			throw uploadError;
		}

		// Get download URL
		const downloadUrl = await getDownloadURL(storageRef);
		return downloadUrl;
	} catch (error) {
		console.error("Error uploading photo:", error);
		throw error;
	}
};
