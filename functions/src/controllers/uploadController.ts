import express from "express";
import {
  uploadImageService,
  deleteImageService,
  getImageService,
} from "../services/uploadService";

export const getImage = async (req: express.Request, res: express.Response) => {
  try {
    const docId = req.params.id as string;
    if (!docId) return res.sendStatus(400).json({ message: "no document id" });

    const downloadUrl = await getImageService(docId);
    if (!downloadUrl) return res.sendStatus(400);

    return downloadUrl;
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const deleteImage = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const docId = req.params.id as string;
    if (!docId) return res.sendStatus(400).json({ message: "no document id" });

    const result = await deleteImageService(docId);
    if (!result.deleted) return res.sendStatus(400);

    return res.status(200).json(result);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const uploadImage = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const file = req.file;
    if (!file) return res.sendStatus(400);

    const result = await uploadImageService(file);
    if (!result) return res.sendStatus(400);

    return res.status(201).json(result);
  } catch (error) {
    // err handling
    return res.sendStatus(400);
  }
};
