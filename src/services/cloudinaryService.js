import { cloudinary } from '~/config';

const fetchUploadImage = async (url, { arg }) => {
  const { files, preset = 'hmzbfqdx' } = arg;
  try {
    if (!files) return false;

    const dataUrl = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i].file;
      if (file.type.split('/')[0] !== 'image') continue;

      const config = {
        ...cloudinary,
        file: file,
        upload_preset: preset,
      };

      const form = new FormData();
      for (const key in config) {
        form.append(key, config[key]);
      }

      const response = await fetch(url, { method: 'POST', body: form });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dataUrl.push({
        url: data.secure_url,
        id: data.public_id,
      });
    }

    return dataUrl;
  } catch (error) {
    throw error;
  }
};

export { fetchUploadImage };
