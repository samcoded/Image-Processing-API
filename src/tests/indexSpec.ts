import supertest from 'supertest';
import { Metadata } from 'sharp';
import app from '../app';
import { getImageData } from '../utilities/image';

const request = supertest(app);

describe('Test for Image Processor API', () => {
  // check for missing query parameters
  it('Checking for missing query parameters', async () => {
    const response = await request.get('/api/image');
    expect(response.status).toBe(400);
  });

  // check for invalid image dimension parameters
  it('Should show error for missing filename parameter', async () => {
    const response = await request.get('/api/image?height=100&width=100');
    expect(response.status).toBe(400);
  });

  it('Should show error for missing width parameter', async () => {
    const response = await request.get(
      '/api/image?filename=fjord.jpg&height=100'
    );
    expect(response.status).toBe(400);
  });
  it('Should show error for missing height parameter', async () => {
    const response = await request.get(
      '/api/image?filename=fjord.jpg&width=100'
    );
    expect(response.status).toBe(400);
  });
  // check for unknown image asset; all query parameters provided but filename could not be found in assets
  it('Should send error for unknown image ', async () => {
    const response = await request.get(
      '/api/image?filename=unknown.jpg&width=100&height=100'
    );
    expect(response.status).toBe(404);
  });

  // happy path - test the image API
  it('Should get resized image', async () => {
    const response = await request.get(
      '/api/image?filename=fjord.jpg&width=100&height=100'
    );
    expect(response.status).toBe(200);
  });

  it('Should get resized image with correct width and height', async () => {
    const response = await request.get(
      '/api/image?filename=fjord.jpg&width=120&height=120'
    );
    expect(response.status).toBe(200);
    // get image data
    const file = await getImageData('thumbs', 'fjord-120-120-thumb.jpg');
    expect(file).toBeTruthy();
    expect((file as Metadata).width).toBe(120);
    expect((file as Metadata).height).toBe(120);
  });
});
