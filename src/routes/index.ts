import express, { Request, Response } from 'express';
import path from 'path';
import { resizeImage, getImageData } from '../utilities/image';

const router = express.Router();

router.get('/image', async (req: Request, res: Response) => {
  const filename: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  if (!filename || !width || !height)
    return res.status(400).send('Bad request');

  const file = await getImageData('images', filename);
  if (!file) return res.status(404).send('File not found');

  try {
    const thumb = await resizeImage(filename, width, height);
    const absolutePath = path.join(
      __dirname,
      '../../',
      `assets/thumbs/${thumb}`
    );
    // res.set({ 'Content-Type': `image/${file.format}` });
    res.status(200).sendFile(absolutePath);
  } catch (err) {
    // console.log((err as Error).message);
    res.status(500).send('Internal server error');
  }
});

export default router;
