import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";

// Configure multer storage
const upload = multer({ dest: "./public/uploads/" });

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    upload.single("image")(req as any, res as any, async (err) => {
      if (err) {
        res.status(500).json({ error: "File upload error" });
        return resolve();
      }

      const file = (req as any).file;
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return resolve();
      }

      const imagePath = file.path;

      try {
        // Process image with Tesseract
        const { data } = await Tesseract.recognize(imagePath, "eng");
        const isValid = data.text.includes("Govt") || data.text.includes("ID No");

        // Cleanup temp file
        fs.unlinkSync(imagePath);

        res.status(200).json({ text: data.text, verified: isValid });
      } catch (error) {
        res.status(500).json({ error: "OCR Processing Failed" });
      }

      resolve();
    });
  });
}
