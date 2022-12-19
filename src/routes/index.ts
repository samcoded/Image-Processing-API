import express, { Request, Response } from 'express';
import path from 'path';
import { resizeImage, getImageData } from '../utilities/image';

const router = express.Router();

router.get('/images', async (req: Request, res: Response) => {
  const filename: string = req.query.filename as string;
  let width: number = parseInt(req.query.width as string);
  let height: number = parseInt(req.query.height as string);

  if (!filename && !width && !height)
    return res.status(400).send('Bad request');

  const file = await getImageData(filename);
  if (!file) return res.status(404).send('File not found');

  try {
    const thumb = await resizeImage(filename, width, height);
    const absolutePath = path.join(
      __dirname,
      '../../',
      `assets/thumbs/${thumb}`
    );
    res.set({ 'Content-Type': 'image/jpg' });
    res.sendFile(absolutePath);
  } catch (err) {
    console.log(err);
  }
});

export default router;
