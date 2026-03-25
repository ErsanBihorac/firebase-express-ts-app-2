import { onRequest } from "firebase-functions/https";
import { initializeApp } from "firebase-admin/app";
import { environment } from "../../frontend/firebase-express-ts-app-2/src/environments/environment";
// import { deleteObject, getDownloadURL } from "firebase/storage";
import express from "express";
import uploadRoutes from "./routes/uploadRoutes";

const expressApp = express();
expressApp.use("api/", uploadRoutes);
export const api = onRequest(expressApp);

// Firebase App
const firebaseConfig = environment.firebase;
initializeApp(firebaseConfig);

// const storage = getStorage();
// const storageRef = ref(storage);

// const imagesRef = ref(storage, "images");
// const sparkyRef = ref(storage, "images/sparky.jpg");

// Receive data in "multipart/form-data" format

// const bytes = new Uint8Array([
//   0x48, 0x65, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21,
// ]);
// uploadBytes(sparkyRef, bytes).then((snapshot) => {
//   // Upload as Uint8Array
//   console.log("Uploaded an array!");
// });

// deleteObject(sparkyRef)
//   .then(() => {
//     console.log("File detected!");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//next step: configurate security rules
