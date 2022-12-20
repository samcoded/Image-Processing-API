import sharp from 'sharp';

export const resizeImage = async (
  image: string,
  width: number,
  height: number
) => {
  //get image name and type
  const name = image.split('.')[0];
  const ext = image.split('.')[1];
  const newImage = `${name}-${width}-${height}-thumb.${ext}`;
  const filepath = `assets/images/${image}`;
  const newImagePath = `assets/thumbs/${newImage}`;

  //resize image and return details and new image

  //check file exist in thumbs folder
  const fileExists = await getImageData('thumbs', newImage);
  if (fileExists) return newImage;

  //resize image if not exists
  await sharp(filepath).resize(width, height).toFile(newImagePath);
  // console.log(`Resized image: ${newImage}`);
  return newImage;
};

// function to get image data
export const getImageData = async (type: string, image: string) => {
  const filepath = `assets/${type}/${image}`;
  try {
    const imageInfo = await sharp(filepath).metadata();
    return imageInfo;
  } catch (err) {
    // console.log((err as Error).message);
    //file not found
    return false;
  }
};
