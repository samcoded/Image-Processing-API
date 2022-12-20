// Image file utilities module
import { getImageData, resizeImage } from '../../utilities/image';
import { Metadata } from 'sharp';

describe('Test for the image file utilities', () => {
  it('Checking if image does not exists', async () => {
    const input = 'unknown.jpg';
    const fileExists = await getImageData('images', input);
    expect(fileExists).toBe(false);
  });

  it('Checking image data', async () => {
    const input = 'fjord.jpg';
    const file = await getImageData('images', input);
    expect(file).toBeTruthy();
    expect((file as Metadata).width).toBe(1920);
    expect((file as Metadata).height).toBe(1280);
  });

  it('Should resize image', async () => {
    const input = 'fjord.jpg';
    const outputFilename = 'fjord-100-100-thumb.jpg';
    const thumb = await resizeImage(input, 100, 100);
    expect(thumb).toEqual(outputFilename);
  });
});
