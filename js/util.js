export function formImageURL(image, imageType, device) {
  let url;
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
  const encodedImage = encodeURIComponent(image);

  if (imageType === 'poster' && device === 'mobile') {
    url = new URL(`w500/${encodedImage}`, BASE_IMAGE_URL);
  }

  return url;
}
