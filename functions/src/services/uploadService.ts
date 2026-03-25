import { serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const db = getFirestore();
const bucket = getStorage().bucket();

export const getImageService = async (docId: string) => {
  const docRef = db.collection("images").doc(docId); // get doc ref

  const snap = await docRef.get(); // get snap of doc and err handl
  if (!snap.exists) throw new Error("Document not found");

  const data = snap.data(); // get data and err handl
  if (!data) throw new Error("Document has no data");

  return data.downloadUrl;
};

export const deleteImageService = async (docId: string) => {
  const docRef = db.collection("images").doc(docId); // create doc reference
  const snap = await docRef.get(); // get snap of doc
  if (!snap.exists) throw new Error("Document not found");

  const data = snap.data(); // copy data
  const path = data?.path; // get path to storage
  if (!path) throw new Error("No storage path on document");

  await bucket.file(path).delete(); // delete image in storage
  await docRef.delete(); // delete doc (path, metadata) in firestore

  return { deleted: true, path };
};

export const uploadImageService = async (file: Express.Multer.File) => {
  const fileName = `${Date.now()}-${file.originalname}`; // create filename based on date and original filename
  const path = `images/${fileName}`; // create path

  const storageFile = bucket.file(path); // create file in storage

  // save file
  await storageFile.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  // get downloadUrl
  const [downloadUrl] = await storageFile.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  // add metadata to firestore
  const docRef = await db.collection("images").add({
    path,
    downloadUrl,
    originalName: file.originalname,
    size: file.size,
    contentType: file.mimetype,
    createdAt: serverTimestamp(),
  });

  return {
    downloadUrl,
    path,
    docId: docRef.id,
  };
};
