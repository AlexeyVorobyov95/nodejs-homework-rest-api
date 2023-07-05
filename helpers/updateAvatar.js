import Jimp from "jimp";

const imageUpdate = async (filename) => {
  const image = await Jimp.read(`public/avatars/${filename}`);

  image.resize(250, 250);
  image.write(`public/avatars/${filename}`);
};

export default imageUpdate;
