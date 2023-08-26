export default function useImage () {

  async function getImageDimensions (url) {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        const { width, height } = image;
        resolve({ width, height });
      };
    });
  }

  return {
    getImageDimensions,
  };
}