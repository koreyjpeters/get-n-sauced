import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirebaseStorage } from './firebase';

const STORAGE_FOLDERS = {
  gallery: 'gallery',
  menu: 'menu',
} as const;

export type UploadFolder = keyof typeof STORAGE_FOLDERS;

/**
 * Upload an image file to Firebase Storage and return its public URL.
 * Use folder 'gallery' or 'menu'. Filename is timestamp + original name to avoid collisions.
 */
export async function uploadImage(file: File, folder: UploadFolder): Promise<string> {
  const storage = getFirebaseStorage();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const path = `${STORAGE_FOLDERS[folder]}/${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type || 'image/jpeg' });
  return getDownloadURL(storageRef);
}
