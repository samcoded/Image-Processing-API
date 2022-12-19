import sharp from 'sharp';

export const resizeImage = async (
  image: string,
  width: number,
  height: number
) => {
  //get image name and type

  const filepath = `assets/images/${image}.jpg`;
  const newImage = `${image}-thumb.jpg`;
  const newImagePath = `assets/thumbs/${newImage}`;

  //resize image and return details and new image

  const resizedImage = await sharp(filepath)
    .resize(width, height)
    .toFile(newImagePath);

  return newImage;
};

// function to get image data
export const getImageData = async (image: string) => {
  const filepath = `assets/images/${image}.jpg`;
  try {
    const imageInfo = await sharp(filepath).metadata();
    return imageInfo;
  } catch (err) {
    console.log(err);
    return false;
  }
};
